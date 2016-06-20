const {contains} = require('validator');

module.exports = (str, {seed}) => {
  return contains(str, seed);
}
