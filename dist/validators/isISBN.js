'use strict';

var _require = require('validator');

const isISBN = _require.isISBN;


module.exports = function (str) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  let version = _ref.version;

  if (typeof str === 'string') {
    return isISBN(str, version);
  } else {
    return false;
  }
};