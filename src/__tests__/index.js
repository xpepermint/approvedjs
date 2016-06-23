const {Approval, ValidationError} = require('..');

let approval = new Approval();

describe('filterInput', () => {

  it('filters input', async () => {
    expect(await approval.filterInput({
      name: ' John  Smith  ',
      email: 'john@smith.com'
    }, [{
      path: 'name',
      type: 'string',
      modifiers: ['squish']
    }])).toEqual({
      name: 'John Smith'
    })
  });

  it('filters nested input', async () => {
    expect(await approval.filterInput({
      user: {
        name: ' John  Smith  ',
        email: 'john@smith.com'
      }
    }, [{
      path: 'user.name',
      type: 'string',
      modifiers: ['squish']
    }])).toEqual({
      user: {
        name: 'John Smith'
      }
    })
  });

  it('filters input with block function', async () => {
    expect(await approval.filterInput({
      name: 'John'
    }, [{
      path: 'name',
      type: 'string',
      block: async (s) => `**${s}**`
    }])).toEqual({
      name: '**John**'
    })
  });

});

describe('validateInput', () => {

  it('validates invalid input', async () => {
    try {
      await approval.validateInput({}, [{
        path: 'name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
      expect(true).toEqual(false);
    } catch(err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  });

  it('validates invalid nested input', async () => {
    try {
      await approval.validateInput({}, [{
        path: 'user.name',
        validator: 'isPresent',
        message: 'must be present'
      }]);
      expect(true).toEqual(false);
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
      expect(true).toEqual(false);
    } catch(err) {
      expect(
        await approval.handleError(err)
      ).toEqual([
        {path: 'name', message: 'must be present'}
      ]);
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
      }])).toEqual([
        {path: 'system', message: 'fake error'}
      ]);
    }
  });

});
