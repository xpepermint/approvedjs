module.exports = (str) => {
  return str.replace(/\r?\n|\r/g, ' ').replace(/\s\s+/g, ' ').trim();
};
