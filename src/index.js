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
    this.typecasts = {
      boolean: require('./typecasts/boolean'),
      date: require('./typecasts/date'),
      float: require('./typecasts/float'),
      integer: require('./typecasts/integer'),
      string: require('./typecasts/string'),
    };
    this.modifiers = {
      squish: require('./modifiers/squish'),
      toLowerCase: require('./modifiers/toLowerCase'),
      toUpperCase: require('./modifiers/toUpperCase'),
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
      matches: require('./validators/matches'),
    };
  }

  async filterInput(input, readers, options={}) {
    let data = {};

    for (let reader of readers) {
      let {path, type} = reader;
      let modifierNames = reader.modifiers || [];

      let typecast = this.typecasts[type];
      if (!typecast) {
        throw new Error(`Unknown type ${type}`);
      }

      let value = typecast(dottie.get(input, path, null));
      if (typeof value === 'undefined') {
        continue;
      }

      for (let modifierName of modifierNames) {
        let modifier = this.modifiers[modifierName];
        if (!modifier) {
          throw new Error(`Unknown modifier ${modifierName}`);
        }

        value = await modifier(value);
      }

      data[path] = value;
    }

    return dottie.transform(data);
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
      let isValid = await validator(value, validation.options||{}, options||{});
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
