const {Approval, ValidationError} = require('../..');

let approval = new Approval();

describe('isLength', () => {

  it('fails when string size is not in the min/max range', async () => {
    try {
      await approval.validateInput({
        name: 'John Smith'
      }, [{
        path: 'name',
        validator: 'isLength',
        options: {min: 3, max: 5},
        message: 'must be between 5 and 10'
      }]);
      expect(false).toEqual(true);
    } catch(err) {
      expect(err.errors).toEqual([{path: 'name', message: 'must be between 5 and 10'}]);
    }
  });

});
