const {Approval, ValidationError} = require('..');

let approval = new Approval();

describe('validateInput', () => {

  it('throws ValidationError on invalid input', async () => {
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

  it('thrown ValidationError includes error messages of invalid fields', async () => {
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

});

describe('handleError', () => {

  it('handles validation errors', async () => {
    try {
      await approval.validateInput({}, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
    } catch(err) {
      let errors = await approval.handleError(err);
      expect(errors).toEqual([{path: 'name', message: 'must be present'}]);
    }
  });

  it('handles custom error', async () => {
    try {
      throw new Error('something went wrong');
    } catch(err) {
      let errors = await approval.handleError(err, [{
        path: 'system',
        error: 'Error',
        message: 'fake error'
      }]);
      expect(errors).toEqual([{path: 'system', message: 'fake error'}]);
    }
  });

});
