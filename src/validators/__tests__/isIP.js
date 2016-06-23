const validator = require('../isIP');

describe('isIP', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('abc')).toEqual(false);
  });

  it('fails when invalid v4 IP', async () => {
    expect(validator('fe80::a6db:30ff:fe98:e946', {version: 4})).toEqual(false);
  });

  it('fails when invalid v6 IP', async () => {
    expect(validator('127.0.0.1', {version: 6})).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('127.0.0.1')).toEqual(true);
  });

  it('passes when valid v4 IP', async () => {
    expect(validator('127.0.0.1', {version: 4})).toEqual(true);
  });

  it('passes when valid v6 IP', async () => {
    expect(validator('fe80::a6db:30ff:fe98:e946', {version: 6})).toEqual(true);
  });

});
