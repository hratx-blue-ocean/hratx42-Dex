const getColumnsString = function(obj) {
  let columns = '(';
  const keys = Object.keys(obj);
  for (let i = 1; i < keys.length + 1; i++) {
    let key = keys[i];
    if (i < keys.length) {
      columns += ` ${key},`;
    } else {
      columns += ` ${key}`;
    }
  }
  columns += ')';
  return columns;
};

module.exports = getColumnsString;
