"use strict";

module.exports = function (value) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$values = _ref.values;
  let values = _ref$values === undefined ? [] : _ref$values;

  return values.findIndex(v => v === value) !== -1;
};