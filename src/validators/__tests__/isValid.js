const {Approval} = require('../..');

let approval = new Approval();

describe('isValid', () => {

  it('fails when synchronous validation block returns false', async () => {
    try {
      await approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: {block: (value) => value !== 'fake'},
        validator: 'isValid',
        message: 'is invalid'
      }]);
      expect(false).toEqual(true);
    } catch(err) {
      expect(await approval.handleError(err)).toEqual([{path: 'name', message: 'is invalid'}]);
    }
  });

  it('fails when asynchronous validation block returns false', async () => {
    try {
      await approval.validateInput({
        name: 'fake'
      }, [{
        path: 'name',
        options: {block: async (value) => value !== 'fake'},
        validator: 'isValid',
        message: 'is invalid'
      }]);
      expect(false).toEqual(true);
    } catch(err) {
      expect(await approval.handleError(err)).toEqual([{path: 'name', message: 'is invalid'}]);
    }
  });

  it('can access validateInput options', async () => {
    try {
      await approval.validateInput({}, [{
        path: 'name',
        options: {block: async (value, {ctx}) => !(ctx === 'context')},
        validator: 'isValid',
        message: 'is invalid'
      }], {ctx: 'context'});
      expect(false).toEqual(true);
    } catch(err) {
      expect(await approval.handleError(err)).toEqual([{path: 'name', message: 'is invalid'}]);
    }
  });

});
