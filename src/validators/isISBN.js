const {isISBN} = require('validator');

module.exports = (str, {version}={}) => {
  if (typeof str === 'string') {
    return isISBN(str, version);
  } else {
    return false;
  }
};
