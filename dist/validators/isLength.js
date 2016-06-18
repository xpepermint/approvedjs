'use strict';

var _require = require('validator');

const isLength = _require.isLength;


module.exports = (str, _ref) => {
  let min = _ref.min;
  let max = _ref.max;

  return isLength(str, { min, max });
};