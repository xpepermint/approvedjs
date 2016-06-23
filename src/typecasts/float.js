module.exports = (value) => {
  if (typeof value === 'number') {
    return value;
  } else if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return undefined;
  }
};
