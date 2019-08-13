module.exports = function(cb) {
  try {
    cb();
  } catch (error) {
    console.error(error);
  }
};
