const fs = require('fs');
module.exports = function(name, data) {
  fs.writeFile(`${name}.json`, JSON.stringify(data), err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${name} made`);
    }
  });
};
