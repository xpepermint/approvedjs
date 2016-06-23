'use strict';

var _require = require('validator');

const matches = _require.matches;


module.exports = (str, _ref) => {
  let pattern = _ref.pattern;
  let modifiers = _ref.modifiers;

  return matches(str, pattern, modifiers);
};