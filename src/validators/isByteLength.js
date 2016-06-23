const {isByteLength} = require('validator');

module.exports = (str, {min=0, max}={}) => {
  if (typeof str === 'string') {
    return isByteLength(str, {min, max});
  } else {
    return false;
  }
};
