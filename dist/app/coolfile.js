var fs, loader;

loader = require('./loader');

fs = require('fs');

module.exports = function(path) {
  var coolfile;
  coolfile = fs.readFileSync(path, "utf-8");
  return eval(coolfile)(loader);
};
