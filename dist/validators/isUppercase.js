'use strict';

var _require = require('validator');

const isUppercase = _require.isUppercase;


module.exports = str => {
  if (typeof str === 'string') {
    return isUppercase(str);
  } else {
    return false;
  }
};