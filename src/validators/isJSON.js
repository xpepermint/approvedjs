const {isJSON} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isJSON(str);
  } else {
    return false;
  }
};
