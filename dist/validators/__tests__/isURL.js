'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isURL');

describe('isURL', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails when invalid', _asyncToGenerator(function* () {
    expect(validator('xyz://foobar.com')).toEqual(false);
  }));

  it('fails if custom protocol', _asyncToGenerator(function* () {
    expect(validator('rtmp://foobar.com')).toEqual(false);
  }));

  it('fails without top-level domain name', _asyncToGenerator(function* () {
    expect(validator('rtmp://local')).toEqual(false);
  }));

  it('fails without protocol', _asyncToGenerator(function* () {
    expect(validator('domain.com')).toEqual(false);
  }));

  it('passes when valid', _asyncToGenerator(function* () {
    expect(validator('http://domain.com')).toEqual(true);
  }));

  it('passes if custom protocol when protocols is [rtmp]', _asyncToGenerator(function* () {
    expect(validator('rtmp://foobar.com', { protocols: ['rtmp'] })).toEqual(true);
  }));

  it('passes without top-level domain name when requireTld is false', _asyncToGenerator(function* () {
    expect(validator('http://foobar', { requireTld: false })).toEqual(true);
  }));

  it('passes without protocol', _asyncToGenerator(function* () {
    expect(validator('domain.com', { requireProtocol: false })).toEqual(true);
  }));
});