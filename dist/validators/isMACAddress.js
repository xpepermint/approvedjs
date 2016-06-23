'use strict';

var _require = require('validator');

const isMACAddress = _require.isMACAddress;


module.exports = str => {
  if (typeof str === 'string') {
    return isMACAddress(str);
  } else {
    return false;
  }
};