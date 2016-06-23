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
    this.types = {
      boolean: require('./types/boolean'),
      date: require('./types/date'),
      float: require('./types/float'),
      integer: require('./types/integer'),
      string: require('./types/string')
    };
    this.modifiers = {
      squish: require('./modifiers/squish'),
      toLowerCase: require('./modifiers/toLowerCase'),
      toUpperCase: require('./modifiers/toUpperCase')
    };
    this.validators = {
      contains: require('./validators/contains'),
      isAbsent: require('./validators/isAbsent'),
      isBase64: require('./validators/isBase64'),
      isByteLength: require('./validators/isByteLength'),
      isCreditCard: require('./validators/isCreditCard'),
      isDate: require('./validators/isDate'),
      isEmail: require('./validators/isEmail'),
      isExcluded: require('./validators/isExcluded'),
      isFQDN: require('./validators/isFQDN'),
      isHexadecimal: require('./validators/isHexadecimal'),
      isHexColor: require('./validators/isHexColor'),
      isIncluded: require('./validators/isIncluded'),
      isIP: require('./validators/isIP'),
      isISBN: require('./validators/isISBN'),
      isISIN: require('./validators/isISIN'),
      isJSON: require('./validators/isJSON'),
      isLength: require('./validators/isLength'),
      isLowercase: require('./validators/isLowercase'),
      isMACAddress: require('./validators/isMACAddress'),
      isMongoId: require('./validators/isMongoId'),
      isPresent: require('./validators/isPresent'),
      isUppercase: require('./validators/isUppercase'),
      isURL: require('./validators/isURL'),
      isUUID: require('./validators/isUUID'),
      isValid: require('./validators/isValid'),
      matches: require('./validators/matches')
    };
  }

  filterInput(input, readers) {
    var _arguments = arguments,
        _this = this;

    return _asyncToGenerator(function* () {
      let options = _arguments.length <= 2 || _arguments[2] === undefined ? {} : _arguments[2];

      let data = {};

      for (let reader of readers) {
        let path = reader.path;
        let type = reader.type;
        let block = reader.block;

        let modifierNames = reader.modifiers || [];

        let typecast = _this.types[type];
        if (!typecast) {
          throw new Error(`Unknown type ${ type }`);
        }

        let value = typecast(_dottie2.default.get(input, path, null), options);
        if (typeof value === 'undefined') {
          continue;
        }

        for (let modifierName of modifierNames) {
          let modifier = _this.modifiers[modifierName];
          if (!modifier) {
            throw new Error(`Unknown modifier ${ modifierName }`);
          }

          value = yield modifier(value, options);
        }

        if (block) {
          value = yield block(value, options);
        }

        data[path] = value;
      }

      return _dottie2.default.transform(data);
    })();
  }

  showValidationError(errors) {
    var _arguments2 = arguments;
    return _asyncToGenerator(function* () {
      let options = _arguments2.length <= 1 || _arguments2[1] === undefined ? {} : _arguments2[1];

      if (errors.length > 0) {
        throw new ValidationError(errors);
      }
    })();
  }

  validateInput(input, validations) {
    var _arguments3 = arguments,
        _this2 = this;

    return _asyncToGenerator(function* () {
      let options = _arguments3.length <= 2 || _arguments3[2] === undefined ? {} : _arguments3[2];

      let errors = [];

      for (let validation of validations) {
        let path = validation.path;
        let message = validation.message;

        let validatorName = validation.validator;

        let validator = _this2.validators[validatorName];
        if (!validator) {
          throw new Error(`Unknown validator ${ validatorName }`);
        }

        let value = _dottie2.default.get(input, path, null);
        let isValid = yield validator(value, validation.options || {}, options || {});
        if (!isValid) {
          errors.push({ path, message });
        }
      }

      return yield _this2.showValidationError(errors, options);
    })();
  }

  handleError(err, handlers) {
    var _arguments4 = arguments;
    return _asyncToGenerator(function* () {
      let options = _arguments4.length <= 2 || _arguments4[2] === undefined ? {} : _arguments4[2];

      if (err instanceof ValidationError) {
        return err.errors;
      }

      let handler = null;
      for (let handlerCandidate of handlers) {
        let handlerOptions = handlerCandidate.options || {};

        if (!( // name
        handlerCandidate.error === err.name || typeof handlerCandidate.error === 'object' && err instanceof handlerCandidate.error)) {
          continue;
        }

        if (!( // code
        typeof handlerOptions.code === 'undefined' || typeof handlerOptions.code !== 'undefined' && handlerOptions.code === err.code)) {
          continue;
        }

        if (!( // block
        typeof handlerOptions.block === 'undefined' || typeof handlerOptions.block !== 'undefined' && (yield handlerOptions.block(err, options)))) {
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