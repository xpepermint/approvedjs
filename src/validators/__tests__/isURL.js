const validator = require('../isURL');

describe('isURL', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('xyz://foobar.com')).toEqual(false);
  });

  it('fails if custom protocol', async () => {
    expect(validator('rtmp://foobar.com')).toEqual(false);
  });

  it('fails without top-level domain name', async () => {
    expect(validator('rtmp://local')).toEqual(false);
  });

  it('fails without protocol', async () => {
    expect(validator('domain.com')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('http://domain.com')).toEqual(true);
  });

  it('passes if custom protocol when protocols is [rtmp]', async () => {
    expect(validator('rtmp://foobar.com', {protocols: ['rtmp']})).toEqual(true);
  });

  it('passes without top-level domain name when requireTld is false', async () => {
    expect(validator('http://foobar', {requireTld: false})).toEqual(true);
  });

  it('passes without protocol', async () => {
    expect(validator('domain.com', {requireProtocol: false})).toEqual(true);
  });

});
