const validator = require('../isBase64');

describe('isBase64', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('1')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('dGVzdA==')).toEqual(true);
  });

});
