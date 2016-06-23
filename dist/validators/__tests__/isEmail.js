'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isEmail');

describe('isEmail', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails when invalid', _asyncToGenerator(function* () {
    expect(validator('john')).toEqual(false);
  }));

  it('fails when display name', _asyncToGenerator(function* () {
    expect(validator('John <john@domain.com>')).toEqual(false);
  }));

  it('fails with UTF8 characters', _asyncToGenerator(function* () {
    expect(validator('šžćč@domain.com')).toEqual(false);
  }));

  it('fails without top-level domain name', _asyncToGenerator(function* () {
    expect(validator('john@domain')).toEqual(false);
  }));

  it('fails without top-level domain name', _asyncToGenerator(function* () {
    expect(validator('john@domain', { requireTld: false })).toEqual(true);
  }));

  it('passes with display name when allowDisplayName is true', _asyncToGenerator(function* () {
    expect(validator('John <john@domain.com>', { allowDisplayName: true })).toEqual(true);
  }));

  it('passes with UTF8 characters when allowUtf8LocalPart is true', _asyncToGenerator(function* () {
    expect(validator('đšpŽĆČ@domain.com', { allowUtf8LocalPart: true })).toEqual(true);
  }));
});