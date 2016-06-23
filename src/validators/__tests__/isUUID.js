const validator = require('../isUUID');

describe('isUUID', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3')).toEqual(false);
  });

  it('fails when invalid v3', async () => {
    expect(validator('987FBC97-4BED-5078-AF07-9141BA07C9F3', {version: 3})).toEqual(false);
  });

  it('fails when invalid v4', async () => {
    expect(validator('987FBC97-4BED-5078-AF07-9141BA07C9F3', {version: 4})).toEqual(false);
  });

  it('fails when invalid v5', async () => {
    expect(validator('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', {version: 5})).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('A987FBC9-4BED-3078-CF07-9141BA07C9F3')).toEqual(true);
  });

  it('passes when valid v3', async () => {
    expect(validator('A987FBC9-4BED-3078-CF07-9141BA07C9F3', {version: 3})).toEqual(true);
  });

  it('passes when valid v4', async () => {
    expect(validator('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', {version: 4})).toEqual(true);
  });

  it('passes when valid v5', async () => {
    expect(validator('987FBC97-4BED-5078-AF07-9141BA07C9F3', {version: 5})).toEqual(true);
  });

});
