const {Approval, ValidationError} = require('..');

// describe('filter', () => {

//   it('filters input', async () => {
//     let schema = new Schema({
//       name: 1000,
//       email: 'john@smith.com'
//     });
//     schema.addFilter({
//       path: 'name',
//       type: 'string'
//     });
//     await schema.filter();
//     expect(schema.data).toEqual({name: '1000'})
//   });

//   it('filters nested input', async () => {
//     let schema = new Schema({
//       user: {
//         name: 1000,
//         email: 'john@smith.com'
//       }
//     });
//     schema.addFilter({
//       path: 'user.name',
//       type: 'string'
//     });
//     await schema.filter();
//     expect(schema.data).toEqual({user: {name: '1000'}})
//   });

//   it('filters input with block function', async () => {
//     let schema = new Schema({
//       name: 'John'
//     });
//     schema.addFilter({
//       path: 'name',
//       type: 'string',
//       block: async (s) => `**${s}**`
//     });
//     await schema.filter();
//     expect(schema.data).toEqual({name: '**John**'})
//   });

// });

// describe('validateInput', () => {

//   it('validates invalid input', async () => {
//     let schema = new Schema();
//     schema.addValidation({
//       path: 'name',
//       validator: 'isPresent',
//       message: 'must be present'
//     });
//     try {
//       await schema.validate();
//       expect(true).toEqual(false);
//     } catch(err) {
//       expect(err instanceof ValidationError).toEqual(true);
//     }
//   });

//   it('validates invalid nested input', async () => {
//     let schema = new Schema();
//     schema.addValidation({
//       path: 'user.name',
//       validator: 'isPresent',
//       message: 'must be present'
//     });
//     try {
//       await schema.validate();
//       expect(true).toEqual(false);
//     } catch(err) {
//       expect(err instanceof ValidationError).toEqual(true);
//     }
//   });

// });

// describe('handleError', () => {

//   it('handles validation error', async () => {
//     let schema = new Schema();
//     schema.addValidation({
//       path: 'name',
//       validator: 'isPresent',
//       message: 'must be present'
//     });
//     try {
//       await schema.validate();
//       expect(true).toEqual(false);
//     } catch(err) {
//       expect(
//         await schema.handle(err)
//       ).toEqual([{
//         path: 'name',
//         message: 'must be present',
//         kind: 'ValidationError',
//         code: 422
//       }]);
//     }
//   });

//   it('handles custom error', async () => {
//     let schema = new Schema();
//     schema.addHandler({
//       path: 'system',
//       error: 'Error',
//       block: (err) => err.message === 'something went wrong',
//       message: 'fake error'
//     });
//     try {
//       throw new Error('something went wrong');
//     } catch(err) {
//       expect(
//         await schema.handle(err)
//       ).toEqual([{
//         path: 'system',
//         message: 'fake error',
//         kind: 'Error',
//         code: 500
//       }]);
//     }
//   });

// });
