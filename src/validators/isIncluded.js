module.exports = (value, {values=[]}={}) => {
  return values.findIndex((v) => v === value) !== -1;
};
