const getColumnsString = function(obj) {
  let columns = '(';
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (i < keys.length - 1) {
      columns += ` ${key},`;
    } else {
      columns += ` ${key}`;
    }
  }
  columns += ')';
  return columns;
};

module.exports = getColumnsString;
