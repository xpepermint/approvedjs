const validator = require('../isMACAddress');

describe('isMACAddress', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('01:02:03:04:05')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('ab:ab:ab:ab:ab:ab')).toEqual(true);
  });

});
