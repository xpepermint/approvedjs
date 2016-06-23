'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isIP');

describe('isIP', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails when invalid', _asyncToGenerator(function* () {
    expect(validator('abc')).toEqual(false);
  }));

  it('fails when invalid v4 IP', _asyncToGenerator(function* () {
    expect(validator('fe80::a6db:30ff:fe98:e946', { version: 4 })).toEqual(false);
  }));

  it('fails when invalid v6 IP', _asyncToGenerator(function* () {
    expect(validator('127.0.0.1', { version: 6 })).toEqual(false);
  }));

  it('passes when valid', _asyncToGenerator(function* () {
    expect(validator('127.0.0.1')).toEqual(true);
  }));

  it('passes when valid v4 IP', _asyncToGenerator(function* () {
    expect(validator('127.0.0.1', { version: 4 })).toEqual(true);
  }));

  it('passes when valid v6 IP', _asyncToGenerator(function* () {
    expect(validator('fe80::a6db:30ff:fe98:e946', { version: 6 })).toEqual(true);
  }));
});