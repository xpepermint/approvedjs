'use strict';

var _require = require('validator');

const isLowercase = _require.isLowercase;


module.exports = str => {
  if (typeof str === 'string') {
    return isLowercase(str);
  } else {
    return false;
  }
};