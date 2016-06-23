const validator = require('../isEmail');

describe('isEmail', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('john')).toEqual(false);
  });

  it('fails when display name', async () => {
    expect(validator('John <john@domain.com>')).toEqual(false);
  });

  it('fails with UTF8 characters', async () => {
    expect(validator('šžćč@domain.com')).toEqual(false);
  });

  it('fails without top-level domain name', async () => {
    expect(validator('john@domain')).toEqual(false);
  });

  it('fails without top-level domain name', async () => {
    expect(validator('john@domain', {requireTld: false})).toEqual(true);
  });

  it('passes with display name when allowDisplayName is true', async () => {
    expect(validator('John <john@domain.com>', {allowDisplayName: true})).toEqual(true);
  });

  it('passes with UTF8 characters when allowUtf8LocalPart is true', async () => {
    expect(validator('đšpŽĆČ@domain.com', {allowUtf8LocalPart: true})).toEqual(true);
  });

});
