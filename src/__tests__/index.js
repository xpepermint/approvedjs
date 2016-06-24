const {Schema, ValidationError} = require('..');

describe('filter', () => {

  it('filters input', async () => {
    let schema = new Schema({
      name: ' John  Smith  ',
      email: 'john@smith.com'
    });
    schema.addFilter({
      path: 'name',
      type: 'string',
      modifiers: ['squish']
    });
    await schema.filter();
    expect(schema.data).toEqual({name: 'John Smith'})
  });

  it('filters nested input', async () => {
    let schema = new Schema({
      user: {
        name: ' John  Smith  ',
        email: 'john@smith.com'
      }
    });
    schema.addFilter({
      path: 'user.name',
      type: 'string',
      modifiers: ['squish']
    });
    await schema.filter();
    expect(schema.data).toEqual({user: {name: 'John Smith'}})
  });

  it('filters input with block function', async () => {
    let schema = new Schema({
      name: 'John'
    });
    schema.addFilter({
      path: 'name',
      type: 'string',
      block: async (s) => `**${s}**`
    });
    await schema.filter();
    expect(schema.data).toEqual({name: '**John**'})
  });

});

describe('validateInput', () => {

  it('validates invalid input', async () => {
    let schema = new Schema();
    schema.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });
    try {
      await schema.validate();
      expect(true).toEqual(false);
    } catch(err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  });

  it('validates invalid nested input', async () => {
    let schema = new Schema();
    schema.addValidation({
      path: 'user.name',
      validator: 'isPresent',
      message: 'must be present'
    });
    try {
      await schema.validate();
      expect(true).toEqual(false);
    } catch(err) {
      expect(err instanceof ValidationError).toEqual(true);
    }
  });

});

describe('handleError', () => {

  it('handles validation error', async () => {
    let schema = new Schema();
    schema.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });
    try {
      await schema.validate();
      expect(true).toEqual(false);
    } catch(err) {
      expect(
        await schema.handle(err)
      ).toEqual([{
        path: 'name',
        message: 'must be present',
        kind: 'ValidationError'
      }]);
    }
  });

  it('handles custom error', async () => {
    let schema = new Schema();
    schema.addHandler({
      path: 'system',
      error: 'Error',
      message: 'fake error'
    });
    try {
      throw new Error('something went wrong');
    } catch(err) {
      expect(
        await schema.handle(err)
      ).toEqual([{
        path: 'system',
        message: 'fake error',
        kind: 'Error'
      }]);
    }
  });

});
