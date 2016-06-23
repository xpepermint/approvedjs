exports.filters = [
  {
    path: 'name',
    type: 'string',
    modifiers: ['squish', 'toLowerCase']
  }
];

exports.validations = [
  {
    path: 'name',
    validator: 'isPresent',
    message: 'must be present'
  }
];

exports.handlers = [];
