const validator = require('../isCreditCard');

describe('isCreditCard', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('1')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('375556917985515')).toEqual(true);
  });

});
