module.exports = (value) => {
  if (value instanceof Date) {
    return value;
  } else if (typeof value === 'number') {
    if (Number.isInteger(value) && value >= 0) {
      return new Date(value);
    }
  } else if (typeof value === 'string') {
    let timestamp = Date.parse(value);
    if (!isNaN(timestamp)) {
      return new Date(timestamp);
    }
  } else {
    return undefined;
  }
};
