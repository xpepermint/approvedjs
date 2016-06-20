exports.validations = [
  {
    path: 'name',
    validator: 'isPresent',
    message: 'must be present'
  },
  {
    path: 'name',
    validator: 'isCool',
    message: 'must be cool'
  }
];

exports.handlers = [];
