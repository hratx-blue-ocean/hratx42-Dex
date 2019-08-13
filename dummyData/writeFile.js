const fs = require('fs');
module.exports = function(name, data) {
  fs.writeFile(`${name}.js`, JSON.stringify(data), err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${name} made`);
    }
  });
};
