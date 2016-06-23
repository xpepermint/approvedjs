'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const typecast = require('../boolean');

describe('boolean', () => {

  it('handles boolean values', _asyncToGenerator(function* () {
    expect(typecast(true)).toEqual(true);
  }));

  it('handles numbers', _asyncToGenerator(function* () {
    expect(typecast(1)).toEqual(true);
    expect(typecast(0)).toEqual(false);
    expect(typecast(2)).toEqual(undefined);
  }));

  it('handles strings', _asyncToGenerator(function* () {
    expect(typecast('true')).toEqual(true);
    expect(typecast('yes')).toEqual(true);
    expect(typecast('1')).toEqual(true);
    expect(typecast('false')).toEqual(false);
    expect(typecast('no')).toEqual(false);
    expect(typecast('0')).toEqual(false);
    expect(typecast('fake')).toEqual(undefined);
  }));
});