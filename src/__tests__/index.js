const {Approval, ValidationError} = require('..');

describe('filter', () => {

  it('filters data', async () => {
    let data = {
      name: 1000,
      email: 'john@smith.com'
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'name',
      type: 'string'
    });

    let output = await approval.filter(data);
    expect(output).toEqual({
      name: '1000'
    });
  });

  it('filters nested data', async () => {
    let data = {
      user: {
        name: 1000,
        email: 'john@smith.com'
      }
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'user.name',
      type: 'string'
    });

    let output = await approval.filter(data);
    expect(output).toEqual({
      user: {
        name: '1000'
      }
    });
  });

  it('filters data with block function', async () => {
    let data = {
      name: 'John'
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'name',
      type: 'string',
      block: async (s) => `**${s}**`
    });

    let output = await approval.filter(data);
    expect(output).toEqual({
      name: '**John**'
    });
  });

});

describe('validateInput', () => {

  it('validates invalid data', async () => {
    let approval = new Approval();
    approval.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      await approval.validate();
      expect(true).toEqual(false);
    } 
    catch(err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  });

  it('validates invalid nested data', async () => {
    let approval = new Approval();
    approval.addValidation({
      path: 'user.name',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      await approval.validate();
      expect(true).toEqual(false);
    } 
    catch(err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  });

});

describe('handleError', () => {

  it('handles validation error', async () => {
    let approval = new Approval();
    approval.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      await approval.validate();
      expect(true).toEqual(false);
    } 
    catch(err) {
      expect(
        await approval.handle(err)
      ).toEqual([{
        path: 'name',
        message: 'must be present',
        kind: 'ValidationError',
        code: 422
      }]);
    }
  });

  it('handles custom error', async () => {
    let approval = new Approval();
    approval.addHandler({
      path: 'system',
      error: 'Error',
      block: (err) => err.message === 'something went wrong',
      message: 'fake error'
    });

    try {
      throw new Error('something went wrong');
    } 
    catch(err) {
      expect(
        await approval.handle(err)
      ).toEqual([{
        path: 'system',
        message: 'fake error',
        kind: 'Error',
        code: 500
      }]);
    }
  });

});
