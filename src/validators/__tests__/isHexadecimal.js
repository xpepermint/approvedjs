const validator = require('../isHexadecimal');

describe('isHexadecimal', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('abcdefg')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('ff0044')).toEqual(true);
  });

});
