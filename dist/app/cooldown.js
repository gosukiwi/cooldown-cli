var ERROR_CODES, fs, glob;

fs = require('fs');

glob = require('glob');

({ERROR_CODES} = require('./error-codes'));

// * Read the `cooolfile.js` file in the current dir
// * Glob folder for markdown files (from CLI)
// * Run `RendererWithTransformations` on all files matched
// * Write expected output files
exports.Cooldown = class {
  constructor(input, output) {
    if (!input) {
      throw new Error(ERROR_CODES.INVALID_INPUT);
    }
    this.glob = input;
    this.output = output;
  }

  run() {
    return glob(this.glob, {}, (err, files) => {
      var file, i, len, results;
      if (err) {
        throw err;
      }
      results = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        results.push(this.readFile(file));
      }
      return results;
    });
  }

  readFile(file) {
    return fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      return console.log(data);
    });
  }

};
