const {matches} = require('validator');

module.exports = (str, {pattern, modifiers}) => {
  return matches(str, pattern, modifiers);
};
