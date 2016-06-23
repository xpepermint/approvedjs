const {isUUID} = require('validator');

module.exports = (str, {version}={}) => {
  if (typeof str === 'string') {
    return isUUID(str, version);
  } else {
    return false;
  }
};
