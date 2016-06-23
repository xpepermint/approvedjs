const validator = require('../isHexColor');

describe('isHexColor', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('#ff')).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('#ff0034')).toEqual(true);
  });

});
