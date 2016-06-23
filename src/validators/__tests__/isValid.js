const validator = require('../isValid');

describe('isValid', () => {

  it('passes with a valid synchronous block', async () => {
    expect(await validator('me', {block: (v) => v === 'me'})).toEqual(true);
  });

  it('passes with a valid synchronous block', async () => {
    expect(await validator('me', {block: async (v) => v === 'me'})).toEqual(true);
  });

});
