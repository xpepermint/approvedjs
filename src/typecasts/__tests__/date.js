const typecast = require('../date');

describe('date', () => {

  it('handles date values', async () => {
    let time = Date.now();
    expect(typecast(new Date(time)).getTime()).toEqual(time);
  });

  it('handles strings', async () => {
    expect(typecast('2016')).toEqual(new Date('2016'));
    expect(typecast('fake')).toEqual(undefined);
  });

});
