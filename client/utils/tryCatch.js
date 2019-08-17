module.exports = async function(cb) {
  try {
    await cb();
  } catch (error) {
    console.error(error);
  }
};
