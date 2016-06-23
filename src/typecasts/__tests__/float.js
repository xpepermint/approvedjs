const typecast = require('../float');

describe('float', () => {

  it('handles numbers', async () => {
    expect(typecast(10)).toEqual(10);
    expect(typecast(10.1)).toEqual(10.1);
  });

  it('handles strings', async () => {
    expect(typecast('10')).toEqual(10);
    expect(typecast('10.1')).toEqual(10.1);
  });

});
