const {isIP} = require('validator');

module.exports = (str, {version}={}) => {
  if (typeof str === 'string') {
    return isIP(str, version);
  } else {
    return false;
  }
};
