'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('..');

const Approval = _require.Approval;
const ValidationError = _require.ValidationError;


describe('filter', () => {

  it('filters common types', _asyncToGenerator(function* () {
    let data = {
      name: 1000,
      email: 'john@smith.com'
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'name',
      type: 'string'
    });

    let output = yield approval.filter(data, null, { strict: true });
    expect(output).toEqual({
      name: '1000'
    });
  }));

  it('filters nested data', _asyncToGenerator(function* () {
    let data = {
      user: {
        name: 1000,
        email: 'john@smith.com'
      }
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'user.name',
      type: 'string'
    });

    let output = yield approval.filter(data, null, { strict: true });
    expect(output).toEqual({
      user: {
        name: '1000'
      }
    });
  }));

  it('filters array types', _asyncToGenerator(function* () {
    let data = {
      ids: [100, 200]
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'ids',
      type: 'string'
    });

    let output = yield approval.filter(data);
    expect(output).toEqual({
      ids: ['100', '200']
    });
  }));

  it('filters common types with block function', _asyncToGenerator(function* () {
    let data = {
      name: 'John'
    };

    let approval = new Approval();
    approval.addFilter({
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

    let output = yield approval.filter(data);
    expect(output).toEqual({
      name: '**John**'
    });
  }));

  it('filters array with block function', _asyncToGenerator(function* () {
    let data = {
      name: ['John', 'Mandy']
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'name',
      type: 'string',
      block: (() => {
        var ref = _asyncToGenerator(function* (s) {
          return `**${ s }**`;
        });

        return function block(_x2) {
          return ref.apply(this, arguments);
        };
      })()
    });

    let output = yield approval.filter(data);
    expect(output).toEqual({
      name: ['**John**', '**Mandy**']
    });
  }));
});

describe('validateInput', () => {

  it('validates invalid common types', _asyncToGenerator(function* () {
    let approval = new Approval();
    approval.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      yield approval.validate();
      expect(true).toEqual(false);
    } catch (err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  }));

  it('validates invalid nested data', _asyncToGenerator(function* () {
    let approval = new Approval();
    approval.addValidation({
      path: 'user.name',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      yield approval.validate();
      expect(true).toEqual(false);
    } catch (err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  }));

  it('validates invalid arrays', _asyncToGenerator(function* () {
    let data = {
      emails: ['a@a.com', null]
    };
    let approval = new Approval();
    approval.addValidation({
      path: 'emails',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      yield approval.validate(data);
      expect(true).toEqual(false);
    } catch (err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  }));
});

describe('handleError', () => {

  it('handles validation error', _asyncToGenerator(function* () {
    let approval = new Approval();
    approval.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      yield approval.validate();
      expect(true).toEqual(false);
    } catch (err) {
      expect((yield approval.handle(err))).toEqual([{
        path: 'name',
        message: 'must be present',
        kind: 'ValidationError',
        code: 422
      }]);
    }
  }));

  it('handles custom error', _asyncToGenerator(function* () {
    let approval = new Approval();
    approval.addHandler({
      path: 'system',
      error: 'Error',
      block: function (err) {
        return err.message === 'something went wrong';
      },
      message: 'fake error'
    });

    try {
      throw new Error('something went wrong');
    } catch (err) {
      expect((yield approval.handle(err))).toEqual([{
        path: 'system',
        message: 'fake error',
        kind: 'Error',
        code: 500
      }]);
    }
  }));
});