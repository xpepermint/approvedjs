const {isHexadecimal} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isHexadecimal(str);
  } else {
    return false;
  }
};
