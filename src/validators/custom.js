module.exports = async (value, options) => {
  return await options.block(value, options);
}
