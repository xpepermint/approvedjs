const ExtendableError = require('es6-error');
const dottie = require('dottie');

exports.validators = {
  isPresent: require('./validators/isPresent'),
  isAbsent: require('./validators/isAbsent'),
  isLength: require('./validators/isLength'),
  custom: require('./validators/custom'),
};

exports.ValidationError = class extends ExtendableError {
  constructor(errors, message='Input is invalid') {
    super(message);
    this.name = 'ValidationError';
    this.code = 422;
    this.errors = errors;
  }
};

exports.showValidationError = async (errors, options={}) => {
  if (errors.length > 0) {
    throw new exports.ValidationError(errors);
  }
};

exports.validateInput = async (input, validations, options={}) => {
  let errors = [];

  for (let validation of validations) {
    let {path, message} = validation;
    let validatorName = validation.validator;

    let validator = exports.validators[validatorName];
    if (!validator) {
      throw new Error(`Unknown validator ${validatorName}`);
    }

    let value = dottie.get(input, path, null);
    let validatorOptions = Object.assign({}, validation, options);
    let isValid = await validator(value, validatorOptions);
    if (!isValid) {
      errors.push({path, message});
    }
  }

  return await exports.showValidationError(errors, options);
};

exports.handleError = async (err, handlers, options={}) => {
  if (err instanceof exports.ValidationError) {
    return err.errors;
  }

  let handler = null;
  for (let handlerCandidate of handlers) {

    if (!( // name
      handlerCandidate.error === err.name
      || typeof handlerCandidate.error === 'object' && err instanceof handlerCandidate.error
    )) { continue }

    if (!( // code
      typeof handlerCandidate.code === 'undefined'
      || typeof handlerCandidate.code !== 'undefined' && handlerCandidate.code === err.code
    )) { continue }

    if (!( // block
      typeof handlerCandidate.block === 'undefined'
      || typeof handlerCandidate.block !== 'undefined' && await handlerCandidate.block(err, options)
    )) { continue }

    handler = handlerCandidate;
    break;
  }

  if (handler) {
    let {path, message} = handler;
    return [{path, message}];
  } else {
    return null;
  }
};
