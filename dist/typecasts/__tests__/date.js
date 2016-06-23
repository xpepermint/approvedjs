'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const typecast = require('../date');

describe('date', () => {

  it('handles date values', _asyncToGenerator(function* () {
    let time = Date.now();
    expect(typecast(new Date(time)).getTime()).toEqual(time);
  }));

  it('handles strings', _asyncToGenerator(function* () {
    expect(typecast('2016')).toEqual(new Date('2016'));
    expect(typecast('fake')).toEqual(undefined);
  }));
});