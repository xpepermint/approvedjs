const {Approval, ValidationError} = require('../..');

let approval = new Approval();

describe('isPresent', () => {

  it('stops undefined values', async () => {
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

  it('stops null values', async () => {
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

  it('stops empty strings', async () => {
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
