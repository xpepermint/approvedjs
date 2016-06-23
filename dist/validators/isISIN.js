'use strict';

var _require = require('validator');

const isISIN = _require.isISIN;


module.exports = str => {
  if (typeof str === 'string') {
    return isISIN(str);
  } else {
    return false;
  }
};