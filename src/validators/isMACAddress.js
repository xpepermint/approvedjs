const {isMACAddress} = require('validator');

module.exports = (str) => {
  if (typeof str === 'string') {
    return isMACAddress(str);
  } else {
    return false;
  }
};
