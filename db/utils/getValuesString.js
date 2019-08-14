module.exports = function(obj) {
  let result = '(';
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (i < keys.length - 1) {
      result += `$${i}, `;
    } else {
      result += `${i}`;
    }
  }
  result += ')';
  return result;
};
