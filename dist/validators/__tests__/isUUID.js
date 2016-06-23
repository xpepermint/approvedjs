'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isUUID');

describe('isUUID', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails when invalid', _asyncToGenerator(function* () {
    expect(validator('xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3')).toEqual(false);
  }));

  it('fails when invalid v3', _asyncToGenerator(function* () {
    expect(validator('987FBC97-4BED-5078-AF07-9141BA07C9F3', { version: 3 })).toEqual(false);
  }));

  it('fails when invalid v4', _asyncToGenerator(function* () {
    expect(validator('987FBC97-4BED-5078-AF07-9141BA07C9F3', { version: 4 })).toEqual(false);
  }));

  it('fails when invalid v5', _asyncToGenerator(function* () {
    expect(validator('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', { version: 5 })).toEqual(false);
  }));

  it('passes when valid', _asyncToGenerator(function* () {
    expect(validator('A987FBC9-4BED-3078-CF07-9141BA07C9F3')).toEqual(true);
  }));

  it('passes when valid v3', _asyncToGenerator(function* () {
    expect(validator('A987FBC9-4BED-3078-CF07-9141BA07C9F3', { version: 3 })).toEqual(true);
  }));

  it('passes when valid v4', _asyncToGenerator(function* () {
    expect(validator('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', { version: 4 })).toEqual(true);
  }));

  it('passes when valid v5', _asyncToGenerator(function* () {
    expect(validator('987FBC97-4BED-5078-AF07-9141BA07C9F3', { version: 5 })).toEqual(true);
  }));
});