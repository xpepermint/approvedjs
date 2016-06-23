'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../contains');

describe('contains', () => {

  it('fails when not a string', _asyncToGenerator(function* () {
    expect(validator(true, { seed: 'true' })).toEqual(false);
  }));

  it('fails when not containing the provided seed', _asyncToGenerator(function* () {
    expect(validator('my fake2 description', { seed: 'black' })).toEqual(false);
  }));

  it('passes when containing the provided seed', _asyncToGenerator(function* () {
    expect(validator('my fake description', { seed: 'fake' })).toEqual(true);
  }));
});