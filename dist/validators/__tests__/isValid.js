'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../..');

const Approval = _require.Approval;
const ValidationError = _require.ValidationError;


let approval = new Approval();

describe('isValid', () => {

  it('validates synchronous code block', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: { block: function (value) {
            return value === 'fake';
          } },
        validator: 'isValid',
        message: 'is fake'
      }]);
    } catch (err) {
      let errors = yield approval.handleError(err);
      expect(errors).toEqual([]);
    }
  }));

  it('validates asynchronous code block', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: { block: (() => {
            var ref = _asyncToGenerator(function* (value) {
              return value === 'fake';
            });

            return function block(_x) {
              return ref.apply(this, arguments);
            };
          })() },
        validator: 'isValid',
        message: 'is fake'
      }]);
    } catch (err) {
      let errors = yield approval.handleError(err);
      expect(errors).toEqual([]);
    }
  }));

  it('code block have access to validateInput options', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: { block: (() => {
            var ref = _asyncToGenerator(function* (value, _ref) {
              let ctx = _ref.ctx;
              return ctx === 'context';
            });

            return function block(_x2, _x3) {
              return ref.apply(this, arguments);
            };
          })() },
        validator: 'isValid',
        message: 'is fake'
      }], { ctx: 'context' });
    } catch (err) {
      let errors = yield approval.handleError(err);
      expect(errors).toEqual([]);
    }
  }));
});