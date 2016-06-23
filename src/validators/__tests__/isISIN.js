const validator = require('../isISIN');

describe('isISIN', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('DE000BAY0018')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('AU0000XVGZA3')).toEqual(true);
  });

});
