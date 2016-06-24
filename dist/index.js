'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = exports.ValidationError = undefined;

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
class Schema {

  constructor(input) {
    let context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this._input = input || {};
    this._context = context;

    this._data = Object.assign({}, input);
    this._types = {};
    this._modifiers = {};
    this._validators = {};
    this._filters = [];
    this._validations = [];
    this._handlers = [];

    this.setType('boolean', require('./types/boolean'));
    this.setType('date', require('./types/date'));
    this.setType('float', require('./types/float'));
    this.setType('integer', require('./types/integer'));
    this.setType('string', require('./types/string'));

    this.setModifier('squish', require('./modifiers/squish'));
    this.setModifier('toLowerCase', require('./modifiers/toLowerCase'));
    this.setModifier('toUpperCase', require('./modifiers/toUpperCase'));

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
  }

  get data() {
    return this._data;
  }

  get context() {
    return this._context;
  }

  get types() {
    return this._types;
  }

  get modifiers() {
    return this._modifiers;
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

  setModifier(name, fn) {
    this._modifiers[name] = fn;

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

  unsetModifier(name) {
    delete this._modifiers[name];

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

  filter() {
    var _this = this,
        _arguments = arguments;

    return _asyncToGenerator(function* () {
      var _ref = _arguments.length <= 0 || _arguments[0] === undefined ? {} : _arguments[0];

      var _ref$strict = _ref.strict;
      let strict = _ref$strict === undefined ? true : _ref$strict;

      let data = strict ? {} : Object.assign({}, _this._data);

      for (let filter of _this.filters) {
        let path = filter.path;
        let type = filter.type;
        let block = filter.block;

        let modifierNames = filter.modifiers || [];

        let typecast = _this.types[type];
        if (!typecast) {
          throw new Error(`Unknown type ${ type }`);
        }

        let value = typecast(_dottie2.default.get(_this._input, path, null), _this.context);
        if (typeof value === 'undefined') {
          continue;
        }

        for (let modifierName of modifierNames) {
          let modifier = _this.modifiers[modifierName];
          if (!modifier) {
            throw new Error(`Unknown modifier ${ modifierName }`);
          }

          value = yield modifier(value, _this.context);
        }

        if (block) {
          value = yield block(value, _this.context);
        }

        data[path] = value;
      }

      _this._data = _dottie2.default.transform(data);

      return _this;
    })();
  }

  validate() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let errors = [];

      for (let validation of _this2.validations) {
        let path = validation.path;
        let message = validation.message;

        let validatorName = validation.validator;

        let validator = _this2.validators[validatorName];
        if (!validator) {
          throw new Error(`Unknown validator ${ validatorName }`);
        }

        let value = _dottie2.default.get(_this2.data, path, null);
        let isValid = yield validator(value, validation.options || {}, _this2.context);
        if (!isValid) {
          errors.push({ path, message, kind: 'ValidationError' });
        }
      }

      if (errors.length > 0) {
        throw new ValidationError(errors);
      } else {
        return _this2;
      }
    })();
  }

  handle(err) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let errors = [];

      if (err instanceof ValidationError) {
        errors = err.errors;
      } else {
        let handler = null;

        for (let handlerCandidate of _this3.handlers) {
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
          typeof handlerOptions.block === 'undefined' || typeof handlerOptions.block !== 'undefined' && (yield handlerOptions.block(err, _this3.context)))) {
            continue;
          }

          handler = handlerCandidate;
          break;
        }

        if (handler) {
          var _handler = handler;
          let path = _handler.path;
          let message = _handler.message;
          let error = _handler.error;

          errors = [{ path, message, kind: error }];
        }
      }

      return errors;
    })();
  }
}
exports.Schema = Schema;