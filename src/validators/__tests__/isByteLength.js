const validator = require('../isByteLength');

describe('isByteLength', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when too short', async () => {
    expect(validator('hello', {min: 10})).toEqual(false);
  });

  it('fails when too long', async () => {
    expect(validator('hello', {max: 2})).toEqual(false);
  });

  it('passes without options', async () => {
    expect(validator('hello')).toEqual(true);
  });

});
