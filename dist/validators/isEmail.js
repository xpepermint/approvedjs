'use strict';

var _require = require('validator');

const isEmail = _require.isEmail;


module.exports = (str, _ref) => {
  let allowDisplayName = _ref.allowDisplayName;
  let allowUtf8LocalPart = _ref.allowUtf8LocalPart;
  let requireTld = _ref.requireTld;

  return isEmail(str, {
    allow_display_name: allowDisplayName,
    allow_utf8_local_part: allowUtf8LocalPart,
    require_tld: requireTld
  });
};