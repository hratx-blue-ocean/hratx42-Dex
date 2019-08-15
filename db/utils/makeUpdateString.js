module.exports = function(obj) {
  let result = 'update cards set ';
  const keys = Object.keys(obj);
  for (let i = 1; i <= keys.length; i++) {
    result += ` ${keys[i - 1]} = $${i},`;
  }
  //get rid of final comma
  result = result.substring(0, result.length - 1);
  result += ` where id = ${obj.id} returning *`;
  return result;
};
