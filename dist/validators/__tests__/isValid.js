'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../..');

const Approval = _require.Approval;


let approval = new Approval();

describe('isValid', () => {

  it('fails when synchronous validation block returns false', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: { block: function (value) {
            return value !== 'fake';
          } },
        validator: 'isValid',
        message: 'is invalid'
      }]);
      expect(false).toEqual(true);
    } catch (err) {
      expect((yield approval.handleError(err))).toEqual([{ path: 'name', message: 'is invalid' }]);
    }
  }));

  it('fails when asynchronous validation block returns false', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: { block: (() => {
            var ref = _asyncToGenerator(function* (value) {
              return value !== 'fake';
            });

            return function block(_x) {
              return ref.apply(this, arguments);
            };
          })() },
        validator: 'isValid',
        message: 'is invalid'
      }]);
      expect(false).toEqual(true);
    } catch (err) {
      expect((yield approval.handleError(err))).toEqual([{ path: 'name', message: 'is invalid' }]);
    }
  }));

  it('can access validateInput options', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({}, [{
        path: 'name',
        options: { block: (() => {
            var ref = _asyncToGenerator(function* (value, _ref) {
              let ctx = _ref.ctx;
              return !(ctx === 'context');
            });

            return function block(_x2, _x3) {
              return ref.apply(this, arguments);
            };
          })() },
        validator: 'isValid',
        message: 'is invalid'
      }], { ctx: 'context' });
      expect(false).toEqual(true);
    } catch (err) {
      expect((yield approval.handleError(err))).toEqual([{ path: 'name', message: 'is invalid' }]);
    }
  }));
});