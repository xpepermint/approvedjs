const modifier = require('../toLowerCase');

describe('toLowerCase', () => {

  it('converts characters to lowercase', async () => {
    expect(modifier('BiG')).toEqual('big');
  });

});
