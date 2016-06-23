const validator = require('../isPresent');

describe('isPresent', () => {

  it('fails when null', async () => {
    expect(validator(null)).toEqual(false);
  });

  it('fails when undefined', async () => {
    expect(validator()).toEqual(false);
  });

  it('fails when blank', async () => {
    expect(validator('')).toEqual(false);
  });

  it('passes when present', async () => {
    expect(validator('john')).toEqual(true);
  });

});
