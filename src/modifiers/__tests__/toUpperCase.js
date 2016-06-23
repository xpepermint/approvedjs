const modifier = require('../toUpperCase');

describe('toUpperCase', () => {

  it('converts characters to uppercase', async () => {
    expect(modifier('sMaLL')).toEqual('SMALL');
  });

});
