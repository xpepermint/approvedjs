const {isMongoId} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isMongoId(str);
  } else {
    return false;
  }
};
