module.exports = function(obj) {
  let result = '(';
  const keys = Object.keys(obj);
  for (let i = 1; i <= keys.length; i++) {
    if (i < keys.length) {
      result += `$${i}, `;
    } else {
      result += `$${i}`;
    }
  }
  result += ')';
  return result;
};
