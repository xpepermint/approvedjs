const validator = require('../isFQDN');

describe('isFQDN', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails without top-level domain name', async () => {
    expect(validator('domain')).toEqual(false);
  });

  it('fails when including underscore', async () => {
    expect(validator('do_main.com')).toEqual(false);
  });

  it('fails when including trailing dot', async () => {
    expect(validator('domain.com.')).toEqual(false);
  });

  it('passes with top-level domain name', async () => {
    expect(validator('domain.com')).toEqual(true);
  });

  it('passes when including underscore where allowUnderscores is true', async () => {
    expect(validator('do_main.com', {allowUnderscores: true})).toEqual(true);
  });

  it('passes when including trailing dot where allowTrailingDot is true', async () => {
    expect(validator('domain.com.', {allowTrailingDot: true})).toEqual(true);
  });

});
