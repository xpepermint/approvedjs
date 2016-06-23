'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isByteLength');

describe('isByteLength', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails when too short', _asyncToGenerator(function* () {
    expect(validator('hello', { min: 10 })).toEqual(false);
  }));

  it('fails when too long', _asyncToGenerator(function* () {
    expect(validator('hello', { max: 2 })).toEqual(false);
  }));

  it('passes without options', _asyncToGenerator(function* () {
    expect(validator('hello')).toEqual(true);
  }));
});