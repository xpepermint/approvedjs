'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const typecast = require('../integer');

describe('integer', () => {

  it('handles numbers', _asyncToGenerator(function* () {
    expect(typecast(10)).toEqual(10);
    expect(typecast(10.1)).toEqual(undefined);
  }));

  it('handles strings', _asyncToGenerator(function* () {
    expect(typecast('10')).toEqual(10);
    expect(typecast('10.1')).toEqual(undefined);
  }));
});