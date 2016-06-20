'use strict';

var _require = require('validator');

const contains = _require.contains;


module.exports = (str, _ref) => {
  let seed = _ref.seed;

  return contains(str, seed);
};