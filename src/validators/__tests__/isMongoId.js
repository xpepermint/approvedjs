const validator = require('../isMongoId');

describe('isMongoId', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('507f1f77bcf86cd7994390')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('507f1f77bcf86cd799439011')).toEqual(true);
  });

});
