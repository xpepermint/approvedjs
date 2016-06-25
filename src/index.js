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

export class Schema {

  constructor(input, context={}) {
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

  async filter({strict=true}={}) {
    let data = strict ? {} : Object.assign({}, this._data);

    for (let filter of this.filters) {
      let {path, type, block} = filter;
      let modifierNames = filter.modifiers || [];

      let typecast = this.types[type];
      if (!typecast) {
        throw new Error(`Unknown type ${type}`);
      }

      let value = typecast(dottie.get(this._input, path, null), this.context);
      if (typeof value === 'undefined') {
        continue;
      }

      for (let modifierName of modifierNames) {
        let modifier = this.modifiers[modifierName];
        if (!modifier) {
          throw new Error(`Unknown modifier ${modifierName}`);
        }

        value = await modifier(value, this.context);
      }

      if (block) {
        value = await block(value, this.context);
      }

      data[path] = value;
    }

    this._data = dottie.transform(data);

    return this;
  }

  async validate() {
    let errors = [];

    for (let validation of this.validations) {
      let {path, message} = validation;
      let validatorName = validation.validator;

      let validator = this.validators[validatorName];
      if (!validator) {
        throw new Error(`Unknown validator ${validatorName}`);
      }

      let value = dottie.get(this.data, path, null);
      let isValid = await validator(value, validation.options||{}, this.context);
      if (!isValid) {
        errors.push({path, message});
      }
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    } else {
      return this;
    }
  }

  async handle(err) {
    let errors = [];

    if (err instanceof ValidationError) {
      errors = Array.from(err.errors).map(({path, message}) => {
        let kind = err.name;
        let code = err.code;
        return {path, message, kind, code};
      });

    } else {
      let handler = null;

      for (let handlerCandidate of this.handlers) {
        if (!( // name
          handlerCandidate.error === err.name
          || typeof handlerCandidate.error === 'object' && err instanceof handlerCandidate.error
        )) { continue }

        if (!( // block
          typeof handlerCandidate.block === 'undefined'
          || typeof handlerCandidate.block !== 'undefined' && await handlerCandidate.block(err, this.context)
        )) { continue }

        handler = handlerCandidate;
        break;
      }

      if (handler) {
        let {path, message} = handler;
        let kind = err.name;
        let code = err.code || 500;
        errors = [{path, message, kind, code}];
      }
    }

    return errors;
  }
}
