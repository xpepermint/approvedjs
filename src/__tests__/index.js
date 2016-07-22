const {Approval, ValidationError} = require('..');

describe('filter', () => {

  it('filters common types', async () => {
    let data = {
      name: 1000,
      email: 'john@smith.com'
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'name',
      type: 'string'
    });

    let output = await approval.filter(data, null, {strict: true});
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

    let output = await approval.filter(data, null, {strict: true});
    expect(output).toEqual({
      user: {
        name: '1000'
      }
    });
  });

  it('filters array types', async () => {
    let data = {
      ids: [100, 200]
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'ids',
      type: 'string'
    });

    let output = await approval.filter(data);
    expect(output).toEqual({
      ids: ['100', '200']
    });
  });

  it('filters common types with block function', async () => {
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

  it('filters array with block function', async () => {
    let data = {
      name: ['John', 'Mandy']
    };

    let approval = new Approval();
    approval.addFilter({
      path: 'name',
      type: 'string',
      block: async (s) => `**${s}**`
    });

    let output = await approval.filter(data);
    expect(output).toEqual({
      name: ['**John**', '**Mandy**']
    });
  });

});

describe('validateInput', () => {

  it('validates invalid common types', async () => {
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

  it('validates invalid arrays', async () => {
    let data = {
      emails: ['a@a.com', null]
    };
    let approval = new Approval();
    approval.addValidation({
      path: 'emails',
      validator: 'isPresent',
      message: 'must be present'
    });

    try {
      await approval.validate(data);
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
