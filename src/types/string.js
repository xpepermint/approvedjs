module.exports = (value) => {
  if (typeof value === 'string') {
    return value;
  } else if (value === null) {
    return undefined;
  } else if (typeof value !== 'undefined') {
    return value.toString();
  } else {
    return undefined;
  }
};
