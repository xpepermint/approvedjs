const {isEmail} = require('validator');

module.exports = (str, {allowDisplayName, allowUtf8LocalPart, requireTld}) => {
  return isEmail(str, {
    allow_display_name: allowDisplayName,
    allow_utf8_local_part: allowUtf8LocalPart,
    require_tld: requireTld
  });
}
