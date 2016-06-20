const {Approval, ValidationError} = require('../..');

let approval = new Approval();

describe('isValid', () => {

  it('validates synchronous code block', async () => {
    try {
      await approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: {block: (value) => value === 'fake'},
        validator: 'isValid',
        message: 'is fake'
      }]);
    } catch(err) {
      let errors = await approval.handleError(err);
      expect(errors).toEqual([]);
    }
  });

  it('validates asynchronous code block', async () => {
    try {
      await approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: {block: async (value) => value === 'fake'},
        validator: 'isValid',
        message: 'is fake'
      }]);
    } catch(err) {
      let errors = await approval.handleError(err);
      expect(errors).toEqual([]);
    }
  });

  it('code block have access to validateInput options', async () => {
    try {
      await approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: {block: async (value, {ctx}) => ctx === 'context'},
        validator: 'isValid',
        message: 'is fake'
      }], {ctx: 'context'});
    } catch(err) {
      let errors = await approval.handleError(err);
      expect(errors).toEqual([]);
    }
  });

});
