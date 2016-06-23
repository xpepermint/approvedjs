'use strict';

var _require = require('validator');

const isJSON = _require.isJSON;


module.exports = str => {
  if (typeof str === 'string') {
    return isJSON(str);
  } else {
    return false;
  }
};