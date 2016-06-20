const {Approval} = require('../..');

let approval = new Approval();

describe('isEmail', () => {

  it('fails when string is not an email', async () => {
    try {
      await approval.validateInput({
        email: 'fake'
      }, [{
        path: 'email',
        validator: 'isEmail',
        message: 'is not an email'
      }]);
      expect(false).toEqual(true);
    } catch(err) {
      console.log(err)
      expect(err.errors).toEqual([{path: 'email', message: 'is not an email'}]);
    }
  });

});
