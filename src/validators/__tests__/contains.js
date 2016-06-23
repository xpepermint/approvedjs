const validator = require('../contains');

describe('contains', () => {

  it('fails when not a string', async () => {
    expect(validator(true, {seed: 'true'})).toEqual(false);
  });

  it('fails when not containing the provided seed', async () => {
    expect(validator('my fake2 description', {seed: 'black'})).toEqual(false);
  });

  it('passes when containing the provided seed', async () => {
    expect(validator('my fake description', {seed: 'fake'})).toEqual(true);
  });

});
