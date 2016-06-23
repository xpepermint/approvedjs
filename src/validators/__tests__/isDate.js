const validator = require('../isDate');

describe('isDate', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('x')).toEqual(false);
  });

  it('fails when invalid iso8601', async () => {
    expect(validator('12.12.2016', {format: 'iso8601'})).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('2009')).toEqual(true);
  });

  it('passes when valid iso8601', async () => {
    expect(validator('2009-12T12:34', {format: 'iso8601'})).toEqual(true);
  });

});
