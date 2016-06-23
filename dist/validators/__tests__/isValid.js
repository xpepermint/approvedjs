'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isValid');

describe('isValid', () => {

  it('passes with a valid synchronous block', _asyncToGenerator(function* () {
    expect((yield validator('me', { block: function (v) {
        return v === 'me';
      } }))).toEqual(true);
  }));

  it('passes with a valid synchronous block', _asyncToGenerator(function* () {
    expect((yield validator('me', { block: (() => {
        var ref = _asyncToGenerator(function* (v) {
          return v === 'me';
        });

        return function block(_x) {
          return ref.apply(this, arguments);
        };
      })() }))).toEqual(true);
  }));
});