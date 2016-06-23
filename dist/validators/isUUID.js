'use strict';

var _require = require('validator');

const isUUID = _require.isUUID;


module.exports = function (str) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  let version = _ref.version;

  if (typeof str === 'string') {
    return isUUID(str, version);
  } else {
    return false;
  }
};