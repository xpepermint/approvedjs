const {isUppercase} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isUppercase(str);
  } else {
    return false;
  }
};
