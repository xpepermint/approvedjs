const validator = require('../isISBN');

describe('isISBN', () => {

  it('fails when not a string', async () => {
    expect(validator(true)).toEqual(false);
  });

  it('fails when invalid', async () => {
    expect(validator('3-423-21412-1')).toEqual(false);
  });

  it('fails when invalid v10', async () => {
    expect(validator('3423214121', {version: 10})).toEqual(false);
  });

  it('fails when invalid v13', async () => {
    expect(validator('9783836221190', {version: 13})).toEqual(false);
  });

  it('passes when valid', async () => {
    expect(validator('3836221195')).toEqual(true);
  });

  it('passes when valid v10', async () => {
    expect(validator('1-61729-085-8', {version: 10})).toEqual(true);
  });

  it('passes when valid v13', async () => {
    expect(validator('978-3401013190', {version: 13})).toEqual(true);
  });

});
