module.exports = async (value, {block}, options) => {
  return await block(value, options);
}
