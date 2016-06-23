"use strict";

module.exports = value => {
  if (value instanceof Number) {
    return value;
  } else if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return undefined;
  }
};