'use strict';

var _require = require('validator');

const isCreditCard = _require.isCreditCard;


module.exports = str => {
  if (typeof str === 'string') {
    return isCreditCard(str);
  } else {
    return false;
  }
};