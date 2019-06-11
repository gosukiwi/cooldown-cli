var CoolfileNotFoundError, fs, loader;

loader = require('./loader');

fs = require('fs');

({CoolfileNotFoundError} = require('./errors'));

module.exports = function(path) {
  var coolfile;
  try {
    coolfile = fs.readFileSync(path, "utf-8");
    return eval(coolfile)(loader);
  } catch (error) {
    throw new CoolfileNotFoundError;
  }
};
