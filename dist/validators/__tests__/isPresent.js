'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isPresent');

describe('isPresent', () => {

  it('fails when null', _asyncToGenerator(function* () {
    expect(validator(null)).toEqual(false);
  }));

  it('fails when undefined', _asyncToGenerator(function* () {
    expect(validator()).toEqual(false);
  }));

  it('fails when blank', _asyncToGenerator(function* () {
    expect(validator('')).toEqual(false);
  }));

  it('passes when present', _asyncToGenerator(function* () {
    expect(validator('john')).toEqual(true);
  }));
});