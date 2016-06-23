const {isBase64} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isBase64(str);
  } else {
    return false;
  }
};
