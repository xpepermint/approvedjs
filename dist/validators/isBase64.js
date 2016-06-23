'use strict';

var _require = require('validator');

const isBase64 = _require.isBase64;


module.exports = str => {
  if (typeof str === 'string') {
    return isBase64(str);
  } else {
    return false;
  }
};