const {isHexColor} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isHexColor(str);
  } else {
    return false;
  }
};
