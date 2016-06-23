const {isFQDN} = require('validator');

module.exports = (str, {requireTld=true, allowUnderscores=false, allowTrailingDot=false}={}) => {
  if (typeof str === 'string') {
    return isFQDN(str, {
      require_tld: requireTld,
      allow_underscores: allowUnderscores,
      allow_trailing_dot: allowTrailingDot
    });
  } else {
    return false;
  }
};
