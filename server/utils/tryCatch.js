module.exports = async function(cb, res) {
  try {
    await cb();
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};
