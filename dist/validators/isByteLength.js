'use strict';

var _require = require('validator');

const isByteLength = _require.isByteLength;


module.exports = function (str) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$min = _ref.min;
  let min = _ref$min === undefined ? 0 : _ref$min;
  let max = _ref.max;

  if (typeof str === 'string') {
    return isByteLength(str, { min, max });
  } else {
    return false;
  }
};