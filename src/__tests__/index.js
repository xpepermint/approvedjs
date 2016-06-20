const {Approval, ValidationError} = require('..');

let approval = new Approval();

describe('validateInput', () => {

  it('throws a ValidationError on invalid input', async () => {
    try {
      await approval.validateInput({}, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch(err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  });

});

describe('handleError', () => {

  it('handles validation error', async () => {
    try {
      await approval.validateInput({}, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch(err) {
      expect(await approval.handleError(err)).toEqual([{path: 'name', message: 'must be present'}]);
    }
  });

  it('handles custom error', async () => {
    try {
      throw new Error('something went wrong');
    } catch(err) {
      expect(await approval.handleError(err, [{
        path: 'system',
        error: 'Error',
        message: 'fake error'
      }])).toEqual([{path: 'system', message: 'fake error'}]);
    }
  });

});
