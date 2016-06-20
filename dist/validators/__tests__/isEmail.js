'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../..');

const Approval = _require.Approval;


let approval = new Approval();

describe('isEmail', () => {

  it('fails when string is not an email', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        email: 'fake'
      }, [{
        path: 'email',
        validator: 'isEmail',
        message: 'is not an email'
      }]);
      expect(false).toEqual(true);
    } catch (err) {
      console.log(err);
      expect(err.errors).toEqual([{ path: 'email', message: 'is not an email' }]);
    }
  }));
});