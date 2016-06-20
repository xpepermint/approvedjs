'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../..');

const Approval = _require.Approval;
const ValidationError = _require.ValidationError;


let approval = new Approval();

describe('isAbsent', () => {

  it('stops unless value is blank', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        name: 'John'
      }, [{
        path: 'name',
        validator: 'isAbsent',
        message: 'must be blank'
      }]);
    } catch (err) {
      expect(err.errors).toEqual([{ path: 'name', message: 'must be blank' }]);
    }
  }));
});