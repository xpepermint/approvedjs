const validator = require('../isUppercase');

describe('isUppercase', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('Hello')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('HELLO')).toEqual(true);
  });

});
