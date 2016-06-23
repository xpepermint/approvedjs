const {isCreditCard} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isCreditCard(str);
  } else {
    return false;
  }
};
