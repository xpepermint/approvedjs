'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('..');

const Schema = _require.Schema;
const ValidationError = _require.ValidationError;


describe('filter', () => {

  it('filters input', _asyncToGenerator(function* () {
    let schema = new Schema({
      name: ' John  Smith  ',
      email: 'john@smith.com'
    });
    schema.addFilter({
      path: 'name',
      type: 'string',
      modifiers: ['squish']
    });
    yield schema.filter();
    expect(schema.data).toEqual({ name: 'John Smith' });
  }));

  it('filters nested input', _asyncToGenerator(function* () {
    let schema = new Schema({
      user: {
        name: ' John  Smith  ',
        email: 'john@smith.com'
      }
    });
    schema.addFilter({
      path: 'user.name',
      type: 'string',
      modifiers: ['squish']
    });
    yield schema.filter();
    expect(schema.data).toEqual({ user: { name: 'John Smith' } });
  }));

  it('filters input with block function', _asyncToGenerator(function* () {
    let schema = new Schema({
      name: 'John'
    });
    schema.addFilter({
      path: 'name',
      type: 'string',
      block: (() => {
        var ref = _asyncToGenerator(function* (s) {
          return `**${ s }**`;
        });

        return function block(_x) {
          return ref.apply(this, arguments);
        };
      })()
    });
    yield schema.filter();
    expect(schema.data).toEqual({ name: '**John**' });
  }));
});

describe('validateInput', () => {

  it('validates invalid input', _asyncToGenerator(function* () {
    let schema = new Schema();
    schema.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });
    try {
      yield schema.validate();
      expect(true).toEqual(false);
    } catch (err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  }));

  it('validates invalid nested input', _asyncToGenerator(function* () {
    let schema = new Schema();
    schema.addValidation({
      path: 'user.name',
      validator: 'isPresent',
      message: 'must be present'
    });
    try {
      yield schema.validate();
      expect(true).toEqual(false);
    } catch (err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  }));
});

describe('handleError', () => {

  it('handles validation error', _asyncToGenerator(function* () {
    let schema = new Schema();
    schema.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });
    try {
      yield schema.validate();
      expect(true).toEqual(false);
    } catch (err) {
      expect((yield schema.handle(err))).toEqual([{
        path: 'name',
        message: 'must be present',
        kind: 'ValidationError'
      }]);
    }
  }));

  it('handles custom error', _asyncToGenerator(function* () {
    let schema = new Schema();
    schema.addHandler({
      path: 'system',
      error: 'Error',
      message: 'fake error'
    });
    try {
      throw new Error('something went wrong');
    } catch (err) {
      expect((yield schema.handle(err))).toEqual([{
        path: 'system',
        message: 'fake error',
        kind: 'Error'
      }]);
    }
  }));
});