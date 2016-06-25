import S from 'string';
import {Schema} from '../../src';

export class User extends Schema {

  constructor(input, context) {
    super(input, context);

    this.addFilter({
      path: 'name',
      type: 'string',
      block: (v) => S(v).stripPunctuation().stripLeft().stripRight().s
    });

    this.addValidation({
      path: 'name',
      validator: 'isPresent',
      message: 'must be present'
    });
  }

  async save() {
    return 'Pretend that data have been saved :).'
  }

};
