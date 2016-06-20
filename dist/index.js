'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Approval = exports.ValidationError = undefined;

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _dottie = require('dottie');

var _dottie2 = _interopRequireDefault(_dottie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

class ValidationError extends _es6Error2.default {

  constructor(errors) {
    let message = arguments.length <= 1 || arguments[1] === undefined ? 'Validation failed' : arguments[1];

    super(message);
    this.name = 'ValidationError';
    this.code = 422;
    this.errors = errors;
  }

}

exports.ValidationError = ValidationError;
class Approval {

  constructor() {
    this.validators = {
      isPresent: require('./validators/isPresent'),
      isAbsent: require('./validators/isAbsent'),
      isLength: require('./validators/isLength'),
      custom: require('./validators/custom')
    };
  }

  showValidationError(errors) {
    var _arguments = arguments;
    return _asyncToGenerator(function* () {
      let options = _arguments.length <= 1 || _arguments[1] === undefined ? {} : _arguments[1];

      if (errors.length > 0) {
        throw new ValidationError(errors);
      }
    })();
  }

  validateInput(input, validations) {
    var _arguments2 = arguments,
        _this = this;

    return _asyncToGenerator(function* () {
      let options = _arguments2.length <= 2 || _arguments2[2] === undefined ? {} : _arguments2[2];

      let errors = [];

      for (let validation of validations) {
        let path = validation.path;
        let message = validation.message;

        let validatorName = validation.validator;

        let validator = _this.validators[validatorName];
        if (!validator) {
          throw new Error(`Unknown validator ${ validatorName }`);
        }

        let value = _dottie2.default.get(input, path, null);
        let validatorOptions = Object.assign({}, validation, options);
        let isValid = yield validator(value, validatorOptions);
        if (!isValid) {
          errors.push({ path, message });
        }
      }

      return yield _this.showValidationError(errors, options);
    })();
  }

  handleError(err, handlers) {
    var _arguments3 = arguments,
        _this2 = this;

    return _asyncToGenerator(function* () {
      let options = _arguments3.length <= 2 || _arguments3[2] === undefined ? {} : _arguments3[2];

      if (err instanceof _this2.ValidationError) {
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
    })();
  }
}
exports.Approval = Approval;