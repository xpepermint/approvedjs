const typecast = require('../string');

describe('string', () => {

  it('handles strings', async () => {
    expect(typecast('')).toEqual('');
    expect(typecast('fake')).toEqual('fake');
    expect(typecast(null)).toEqual(undefined);
  });

  it('handles strings', async () => {
    expect(typecast(10)).toEqual('10');
    expect(typecast(10.1)).toEqual('10.1');
  });

});
