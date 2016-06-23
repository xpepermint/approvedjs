const validator = require('../isIncluded');

describe('isIncluded', () => {

  it('fails when not included in the list', async () => {
    expect(validator(true, {values: [false]})).toEqual(false);
  });

  it('passes when included in the list', async () => {
    expect(validator(true, {values: [false, true]})).toEqual(true);
  });

});
