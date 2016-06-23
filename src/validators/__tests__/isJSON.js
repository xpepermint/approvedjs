const validator = require('../isJSON');

describe('isJSON', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('{key: "value"}')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('{"key": "value"}')).toEqual(true);
  });

});
