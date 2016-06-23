const typecast = require('../integer');

describe('integer', () => {

  it('handles numbers', async () => {
    expect(typecast(10)).toEqual(10);
    expect(typecast(10.1)).toEqual(undefined);
  });

  it('handles strings', async () => {
    expect(typecast('10')).toEqual(10);
    expect(typecast('10.1')).toEqual(undefined);
  });

});
