'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const ExtendableError = require('es6-error');
const dottie = require('dottie');

exports.validators = {
  isPresent: require('./validators/isPresent'),
  isAbsent: require('./validators/isAbsent'),
  isLength: require('./validators/isLength'),
  custom: require('./validators/custom')
};

exports.ValidationError = class extends ExtendableError {
  constructor(errors) {
    let message = arguments.length <= 1 || arguments[1] === undefined ? 'Input is invalid' : arguments[1];

    super(message);
    this.name = 'ValidationError';
    this.code = 422;
    this.errors = errors;
  }
};

exports.showValidationError = (() => {
  var ref = _asyncToGenerator(function* (errors) {
    let options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (errors.length > 0) {
      throw new exports.ValidationError(errors);
    }
  });

  return function (_x3) {
    return ref.apply(this, arguments);
  };
})();

exports.validateInput = (() => {
  var ref = _asyncToGenerator(function* (input, validations) {
    let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    let errors = [];

    for (let validation of validations) {
      let path = validation.path;
      let message = validation.message;

      let validatorName = validation.validator;

      let validator = exports.validators[validatorName];
      if (!validator) {
        throw new Error(`Unknown validator ${ validatorName }`);
      }

      let value = dottie.get(input, path, null);
      let validatorOptions = Object.assign({}, validation, options);
      let isValid = yield validator(value, validatorOptions);
      if (!isValid) {
        errors.push({ path, message });
      }
    }

    return yield exports.showValidationError(errors, options);
  });

  return function (_x5, _x6) {
    return ref.apply(this, arguments);
  };
})();

exports.handleError = (() => {
  var ref = _asyncToGenerator(function* (err, handlers) {
    let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (err instanceof exports.ValidationError) {
      return err.errors;
    }

    let handler = null;
    for (let handlerCandidate of handlers) {

      if (!( // name
      handlerCandidate.error === err.name || typeof handlerCandidate.error === 'object' && err instanceof handlerCandidate.error)) {
        continue;
      }

      if (!( // code
      typeof handlerCandidate.code === 'undefined' || typeof handlerCandidate.code !== 'undefined' && handlerCandidate.code === err.code)) {
        continue;
      }

      if (!( // block
      typeof handlerCandidate.block === 'undefined' || typeof handlerCandidate.block !== 'undefined' && (yield handlerCandidate.block(err, options)))) {
        continue;
      }

      handler = handlerCandidate;
      break;
    }

    if (handler) {
      var _handler = handler;
      let path = _handler.path;
      let message = _handler.message;

      return [{ path, message }];
    } else {
      return null;
    }
  });

  return function (_x8, _x9) {
    return ref.apply(this, arguments);
  };
})();