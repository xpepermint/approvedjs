const typecast = require('../boolean');

describe('boolean', () => {

  it('handles boolean values', async () => {
    expect(typecast(true)).toEqual(true);
  });

  it('handles numbers', async () => {
    expect(typecast(1)).toEqual(true);
    expect(typecast(0)).toEqual(false);
    expect(typecast(2)).toEqual(undefined);
  });

  it('handles strings', async () => {
    expect(typecast('true')).toEqual(true);
    expect(typecast('yes')).toEqual(true);
    expect(typecast('1')).toEqual(true);
    expect(typecast('false')).toEqual(false);
    expect(typecast('no')).toEqual(false);
    expect(typecast('0')).toEqual(false);
    expect(typecast('fake')).toEqual(undefined);
  });

});
