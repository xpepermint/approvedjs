'use strict';

var _require = require('validator');

const isMongoId = _require.isMongoId;


module.exports = str => {
  if (typeof str === 'string') {
    return isMongoId(str);
  } else {
    return false;
  }
};