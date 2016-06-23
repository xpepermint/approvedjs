'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const validator = require('../isIncluded');

describe('isIncluded', () => {

  it('fails when not included in the list', _asyncToGenerator(function* () {
    expect(validator(true, { values: [false] })).toEqual(false);
  }));

  it('passes when included in the list', _asyncToGenerator(function* () {
    expect(validator(true, { values: [false, true] })).toEqual(true);
  }));
});