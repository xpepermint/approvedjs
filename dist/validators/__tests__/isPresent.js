'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../..');

const Approval = _require.Approval;
const ValidationError = _require.ValidationError;


let approval = new Approval();

describe('isPresent', () => {

  it('fails when value is undefined', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({}, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch (err) {
      expect(err.errors).toEqual([{ path: 'name', message: 'must be present' }]);
    }
  }));

  it('fails when value is null', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: null
      }, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch (err) {
      expect(err.errors).toEqual([{ path: 'name', message: 'must be present' }]);
    }
  }));

  it('fails when value is blank', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: ''
      }, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch (err) {
      expect(err.errors).toEqual([{ path: 'name', message: 'must be present' }]);
    }
  }));
});