const validator = require('../isExcluded');

describe('isExcluded', () => {

  it('fails when not excluded in the list', async () => {
    expect(validator(false, {values: [false]})).toEqual(false);
  });

  it('passes when excluded in the list', async () => {
    expect(validator(true, {values: [false]})).toEqual(true);
  });

});
