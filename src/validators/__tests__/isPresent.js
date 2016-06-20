const {Approval, ValidationError} = require('../..');

let approval = new Approval();

describe('isPresent', () => {

  it('fails when value is undefined', async () => {
    try {
      await approval.validateInput({}, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch(err) {
      expect(err.errors).toEqual([{path: 'name', message: 'must be present'}]);
    }
  });

  it('fails when value is null', async () => {
    try {
      await approval.validateInput({
        name: null
      }, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch(err) {
      expect(err.errors).toEqual([{path: 'name', message: 'must be present'}]);
    }
  });

  it('fails when value is blank', async () => {
    try {
      await approval.validateInput({
        name: ''
      }, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch(err) {
      expect(err.errors).toEqual([{path: 'name', message: 'must be present'}]);
    }
  });

});
