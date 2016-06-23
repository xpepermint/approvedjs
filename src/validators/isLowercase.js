const {isLowercase} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isLowercase(str);
  } else {
    return false;
  }
};
