const validator = require('../matches');

describe('matches', () => {

  it('passes with a valid pattern', async () => {
    expect(validator('me', 'me', 'i')).toEqual(true);
  });

});
