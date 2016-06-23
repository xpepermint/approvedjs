const validator = require('../isLowercase');

describe('isLowercase', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('Hello')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('hello')).toEqual(true);
  });

});
