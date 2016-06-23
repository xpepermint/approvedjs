'use strict';

var _require = require('validator');

const isHexColor = _require.isHexColor;


module.exports = str => {
  if (typeof str === 'string') {
    return isHexColor(str);
  } else {
    return false;
  }
};