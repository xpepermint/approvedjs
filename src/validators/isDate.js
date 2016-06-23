const {isDate, isISO8601} = require('validator');

function isFormat(str, format) {
  if (!format) return true;

  switch(format) {
    case 'iso8601':
      return isISO8601(str);
    default:
      return false;
  }
}

module.exports = (str, {format}={}) => {
  if (typeof str !== 'string') return false;
  if (!isDate(str)) return false;
  if (!isFormat(str, format)) return false;
  return true;
};
