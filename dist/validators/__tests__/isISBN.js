'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isISBN');

describe('isISBN', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true)).toEqual(false);
  }));

  it('fails when invalid', _asyncToGenerator(function* () {
    expect(validator('3-423-21412-1')).toEqual(false);
  }));

  it('fails when invalid v10', _asyncToGenerator(function* () {
    expect(validator('3423214121', { version: 10 })).toEqual(false);
  }));

  it('fails when invalid v13', _asyncToGenerator(function* () {
    expect(validator('9783836221190', { version: 13 })).toEqual(false);
  }));

  it('passes when valid', _asyncToGenerator(function* () {
    expect(validator('3836221195')).toEqual(true);
  }));

  it('passes when valid v10', _asyncToGenerator(function* () {
    expect(validator('1-61729-085-8', { version: 10 })).toEqual(true);
  }));

  it('passes when valid v13', _asyncToGenerator(function* () {
    expect(validator('978-3401013190', { version: 13 })).toEqual(true);
  }));
});