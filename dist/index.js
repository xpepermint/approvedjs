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
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$filters = _ref.filters;
    let filters = _ref$filters === undefined ? [] : _ref$filters;
    var _ref$validations = _ref.validations;
    let validations = _ref$validations === undefined ? [] : _ref$validations;
    var _ref$handlers = _ref.handlers;
    let handlers = _ref$handlers === undefined ? [] : _ref$handlers;
    var _ref$types = _ref.types;
    let types = _ref$types === undefined ? {} : _ref$types;
    var _ref$validators = _ref.validators;
    let validators = _ref$validators === undefined ? {} : _ref$validators;

    this._types = {};
    this._validators = {};
    this._filters = filters;
    this._validations = validations;
    this._handlers = handlers;

    this.setType('boolean', require('./types/boolean'));
    this.setType('date', require('./types/date'));
    this.setType('float', require('./types/float'));
    this.setType('integer', require('./types/integer'));
    this.setType('string', require('./types/string'));

    for (let type in types) {
      this.setType(type, types[type]);
    }

    this.setValidator('contains', require('./validators/contains'));
    this.setValidator('isAbsent', require('./validators/isAbsent'));
    this.setValidator('isBase64', require('./validators/isBase64'));
    this.setValidator('isByteLength', require('./validators/isByteLength'));
    this.setValidator('isCreditCard', require('./validators/isCreditCard'));
    this.setValidator('isDate', require('./validators/isDate'));
    this.setValidator('isEmail', require('./validators/isEmail'));
    this.setValidator('isExcluded', require('./validators/isExcluded'));
    this.setValidator('isFQDN', require('./validators/isFQDN'));
    this.setValidator('isHexadecimal', require('./validators/isHexadecimal'));
    this.setValidator('isHexColor', require('./validators/isHexColor'));
    this.setValidator('isIncluded', require('./validators/isIncluded'));
    this.setValidator('isIP', require('./validators/isIP'));
    this.setValidator('isISBN', require('./validators/isISBN'));
    this.setValidator('isISIN', require('./validators/isISIN'));
    this.setValidator('isJSON', require('./validators/isJSON'));
    this.setValidator('isLength', require('./validators/isLength'));
    this.setValidator('isLowercase', require('./validators/isLowercase'));
    this.setValidator('isMACAddress', require('./validators/isMACAddress'));
    this.setValidator('isMongoId', require('./validators/isMongoId'));
    this.setValidator('isPresent', require('./validators/isPresent'));
    this.setValidator('isUppercase', require('./validators/isUppercase'));
    this.setValidator('isURL', require('./validators/isURL'));
    this.setValidator('isUUID', require('./validators/isUUID'));
    this.setValidator('isValid', require('./validators/isValid'));
    this.setValidator('matches', require('./validators/matches'));

    for (let validator in validators) {
      this.setValidator(validator, validators[validator]);
    }
  }

  get types() {
    return this._types;
  }

  get validators() {
    return this._validators;
  }

  get filters() {
    return this._filters;
  }

  get validations() {
    return this._validations;
  }

  get handlers() {
    return this._handlers;
  }

  setType(name, fn) {
    this._types[name] = fn;

    return this;
  }

  setValidator(name, fn) {
    this._validators[name] = fn;

    return this;
  }

  unsetType(name) {
    delete this._types[name];

    return this;
  }

  unsetValidator(name) {
    delete this._validators[name];

    return this;
  }

  addFilter(filter) {
    this._filters.push(filter);

    return this;
  }

  addValidation(validation) {
    this._validations.push(validation);

    return this;
  }

  addHandler(handler) {
    this._handlers.push(handler);

    return this;
  }

  removeFilterAtIndex(index) {
    this._filters.splice(index, 1);

    return this;
  }

  removeValidationAtIndex(index) {
    this._validations.splice(index, 1);

    return this;
  }

  removeHandlerAtIndex(index) {
    this._handlers.splice(index, 1);

    return this;
  }

  filter(data) {
    var _arguments = arguments,
        _this = this;

    return _asyncToGenerator(function* () {
      let context = _arguments.length <= 1 || _arguments[1] === undefined ? {} : _arguments[1];

      var _ref2 = _arguments.length <= 2 || _arguments[2] === undefined ? {} : _arguments[2];

      var _ref2$strict = _ref2.strict;
      let strict = _ref2$strict === undefined ? true : _ref2$strict;

      if (!data) data = {};

      let output = strict ? {} : Object.assign({}, data);

      for (let filter of _this.filters) {
        let path = filter.path;
        let type = filter.type;
        let block = filter.block;


        let typecast = _this.types[type];
        if (!typecast) {
          throw new Error(`Unknown type ${ type }`);
        }

        let value = typecast(_dottie2.default.get(data, path, null), context);
        if (typeof value === 'undefined') {
          continue;
        }

        if (block) {
          value = yield block(value, context);
        }

        output[path] = value;
      }

      return _dottie2.default.transform(output);
    })();
  }

  validate(data) {
    var _arguments2 = arguments,
        _this2 = this;

    return _asyncToGenerator(function* () {
      let context = _arguments2.length <= 1 || _arguments2[1] === undefined ? {} : _arguments2[1];

      if (!data) data = {};

      let errors = [];

      for (let validation of _this2.validations) {
        let path = validation.path;
        let message = validation.message;

        let validatorName = validation.validator;

        let validator = _this2.validators[validatorName];
        if (!validator) {
          throw new Error(`Unknown validator ${ validatorName }`);
        }

        let value = _dottie2.default.get(data, path, null);
        let isValid = yield validator(value, validation.options || {}, context);
        if (!isValid) {
          errors.push({ path, message });
        }
      }

      if (errors.length > 0) {
        throw new ValidationError(errors);
      } else {
        return data;
      }
    })();
  }

  handle(err) {
    var _arguments3 = arguments,
        _this3 = this;

    return _asyncToGenerator(function* () {
      let context = _arguments3.length <= 1 || _arguments3[1] === undefined ? {} : _arguments3[1];

      let errors = null;

      if (err instanceof ValidationError) {
        errors = Array.from(err.errors).map(function (_ref3) {
          let path = _ref3.path;
          let message = _ref3.message;

          let kind = err.name;
          let code = err.code;
          return { path, message, kind, code };
        });
      } else {
        let handler = null;

        for (let handlerCandidate of _this3.handlers) {
          if (!( // name
          handlerCandidate.error === err.name || typeof handlerCandidate.error === 'object' && err instanceof handlerCandidate.error)) {
            continue;
          }

          if (!( // block
          typeof handlerCandidate.block === 'undefined' || typeof handlerCandidate.block !== 'undefined' && (yield handlerCandidate.block(err, context)))) {
            continue;
          }

          handler = handlerCandidate;
          break;
        }

        if (handler) {
          var _handler = handler;
          let path = _handler.path;
          let message = _handler.message;

          let kind = err.name;
          let code = err.code || 500;
          errors = [{ path, message, kind, code }];
        }
      }

      return errors;
    })();
  }
}
exports.Approval = Approval;