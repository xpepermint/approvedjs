'use strict';

var _require = require('validator');

const isHexadecimal = _require.isHexadecimal;


module.exports = str => {
  if (typeof str === 'string') {
    return isHexadecimal(str);
  } else {
    return false;
  }
};