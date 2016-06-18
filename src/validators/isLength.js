const {isLength} = require('validator');

module.exports = (str, {min, max}) => {
  return isLength(str, {min, max});
}
