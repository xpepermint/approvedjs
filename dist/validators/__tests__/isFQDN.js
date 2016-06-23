'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isFQDN');

describe('isFQDN', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails without top-level domain name', _asyncToGenerator(function* () {
    expect(validator('domain')).toEqual(false);
  }));

  it('fails when including underscore', _asyncToGenerator(function* () {
    expect(validator('do_main.com')).toEqual(false);
  }));

  it('fails when including trailing dot', _asyncToGenerator(function* () {
    expect(validator('domain.com.')).toEqual(false);
  }));

  it('passes with top-level domain name', _asyncToGenerator(function* () {
    expect(validator('domain.com')).toEqual(true);
  }));

  it('passes when including underscore where allowUnderscores is true', _asyncToGenerator(function* () {
    expect(validator('do_main.com', { allowUnderscores: true })).toEqual(true);
  }));

  it('passes when including trailing dot where allowTrailingDot is true', _asyncToGenerator(function* () {
    expect(validator('domain.com.', { allowTrailingDot: true })).toEqual(true);
  }));
});