module.exports = (value) => {
  if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    let str = value.toString().toLowerCase();

    if (str === 'true' || str === 'yes' || str === '1') {
      return true;
    } else if (str === 'false' || str === 'no' || str === '0') {
      return false;
    }
  }
  return undefined;
};
