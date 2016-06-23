'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isDate');

describe('isDate', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails when invalid', _asyncToGenerator(function* () {
    expect(validator('x')).toEqual(false);
  }));

  it('fails when invalid iso8601', _asyncToGenerator(function* () {
    expect(validator('12.12.2016', { format: 'iso8601' })).toEqual(false);
  }));

  it('passes when valid', _asyncToGenerator(function* () {
    expect(validator('2009')).toEqual(true);
  }));

  it('passes when valid iso8601', _asyncToGenerator(function* () {
    expect(validator('2009-12T12:34', { format: 'iso8601' })).toEqual(true);
  }));
});