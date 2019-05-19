var ERROR_CODES, InputEmptyError, glob;

glob = require('glob');

({ERROR_CODES} = require('./error-codes'));

(InputEmptyError = class InputEmptyError {}) < Error;

// * Read the `cooolfile.js` file in the current dir
// * Glob folder for markdown files (from CLI)
// * Run `RendererWithTransformations` on all files matched
// * Write expected output files
exports.Cooldown = class {
  constructor(input, outputLocation) {
    if (!input) {
      throw new Error(ERROR_CODES.INVALID_INPUT);
    }
    this.glob = input;
    this.outputLocation = outputLocation;
  }

  run() {
    return glob(this.glob, {}, function(er, files) {
      return console.log(files);
    });
  }

};
