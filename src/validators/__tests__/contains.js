const {Approval, ValidationError} = require('../..');

let approval = new Approval();

describe('contains', () => {

  it('fails when string does not contain the provided seed', async () => {
    try {
      await approval.validateInput({
        description: 'my fake description'
      }, [{
        path: 'description',
        validator: 'contains',
        options: {seed: 'hello'},
        message: 'must contain the `hello` word'
      }]);
      expect(false).toEqual(true);
    } catch(err) {
      expect(err.errors).toEqual([{path: 'description', message: 'must contain the `hello` word'}]);
    }
  });

});
