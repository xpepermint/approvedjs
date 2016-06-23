const validator = require('../isAbsent');

describe('isAbsent', () => {

  it('fails when not blank', async () => {
    expect(validator('text')).toEqual(false);
  });

  it('passes when null', async () => {
    expect(validator(null)).toEqual(true);
  });

  it('passes when undefined', async () => {
    expect(validator()).toEqual(true);
  });

  it('passes when blank', async () => {
    expect(validator('')).toEqual(true);
  });

});
