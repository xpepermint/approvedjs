const {isLength} = require('validator');

module.exports = (str, {min=0, max}={}) => {
  if (typeof str === 'string') {
    return isLength(str, {min, max});
  } else {
    return false;
  }
};
