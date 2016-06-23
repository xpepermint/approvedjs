const modifier = require('../squish');

describe('squish', () => {

  it('trips new lines and multiple spaces', async () => {
    expect(modifier('  here    we go  ')).toEqual('here we go');
  });

});
