import ExtendableError from 'es6-error';
import dottie from 'dottie';

export class ValidationError extends ExtendableError {

  constructor(errors, message='Validation failed') {
    super(message);
    this.name = 'ValidationError';
    this.code = 422;
    this.errors = errors;
  }

}

export class Approval {

  constructor() {
    this.validators = {
      isPresent: require('./validators/isPresent'),
      isAbsent: require('./validators/isAbsent'),
      isLength: require('./validators/isLength'),
      isValid: require('./validators/isValid'),
    };
  }

  async showValidationError(errors, options={}) {
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
  }

  async validateInput(input, validations, options={}) {
    let errors = [];

    for (let validation of validations) {
      let {path, message} = validation;
      let validatorName = validation.validator;

      let validator = this.validators[validatorName];
      if (!validator) {
        throw new Error(`Unknown validator ${validatorName}`);
      }

      let value = dottie.get(input, path, null);
      let isValid = await validator(value, validation.options, options);
      if (!isValid) {
        errors.push({path, message});
      }
    }

    return await this.showValidationError(errors, options);
  }

  async handleError(err, handlers, options={}) {
    if (err instanceof ValidationError) {
      return err.errors;
    }

    let handler = null;
    for (let handlerCandidate of handlers) {
      let handlerOptions = handlerCandidate.options || {};

      if (!( // name
        handlerCandidate.error === err.name
        || typeof handlerCandidate.error === 'object' && err instanceof handlerCandidate.error
      )) { continue }

      if (!( // code
        typeof handlerOptions.code === 'undefined'
        || typeof handlerOptions.code !== 'undefined' && handlerOptions.code === err.code
      )) { continue }

      if (!( // block
        typeof handlerOptions.block === 'undefined'
        || typeof handlerOptions.block !== 'undefined' && await handlerOptions.block(err, options)
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
  }
}
