import S from 'string';
import {Approval} from '../../src';

export const approval = new Approval({
  types: {
    'coolType': (value, context) => {}
  },
  validators: {
    'isCool': (value, context) => str === 'cool'
  },
  filters: [
    {
      path: 'name', 
      type: 'string', 
      block: (v) => S(v).stripPunctuation().stripLeft().stripRight().s
    }
  ],
  validations: [
    {
      path: 'name', 
      validator: 'isPresent', 
      message: 'must be present'
    }
  ],
  handlers: [
    {
      path: 'email', 
      error: 'MongoError', 
      block: async (err) => err.code === 11000 && mongoParser(err).index === 'uniqueEmail',
      message: 'is already taken'
    }
  ]
});
