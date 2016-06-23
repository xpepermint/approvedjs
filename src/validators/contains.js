const {contains} = require('validator');

module.exports = (str, {seed}) => {
  if (typeof str === 'string') {
    return contains(str, seed);
  } else {
    return false;
  }
};
