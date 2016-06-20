'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../..');

const Approval = _require.Approval;


let approval = new Approval();

describe('contains', () => {

  it('fails when string does not contain the provided seed', _asyncToGenerator(function* () {
    try {
      yield approval.validateInput({
        description: 'my fake description'
      }, [{
        path: 'description',
        validator: 'contains',
        options: { seed: 'hello' },
        message: 'must contain the `hello` word'
      }]);
      expect(false).toEqual(true);
    } catch (err) {
      expect(err.errors).toEqual([{ path: 'description', message: 'must contain the `hello` word' }]);
    }
  }));
});