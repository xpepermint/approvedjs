'use strict';

var _require = require('validator');

const contains = _require.contains;


module.exports = (str, _ref) => {
  let seed = _ref.seed;

  if (typeof str === 'string') {
    return contains(str, seed);
  } else {
    return false;
  }
};