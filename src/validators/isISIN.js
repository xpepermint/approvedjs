const {isISIN} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isISIN(str);
  } else {
    return false;
  }
};
