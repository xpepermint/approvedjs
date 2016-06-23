'use strict';

var _require = require('validator');

const isDate = _require.isDate;
const isISO8601 = _require.isISO8601;


function isFormat(str, format) {
  if (!format) return true;

  switch (format) {
    case 'iso8601':
      return isISO8601(str);
    default:
      return false;
  }
}

module.exports = function (str) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  let format = _ref.format;

  if (typeof str !== 'string') return false;
  if (!isDate(str)) return false;
  if (!isFormat(str, format)) return false;
  return true;
};