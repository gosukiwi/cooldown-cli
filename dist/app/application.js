var Compiler, ERROR_CODES, fs, glob, path;

({ERROR_CODES} = require('./error-codes'));

({Compiler} = require('./compiler'));

fs = require('fs');

path = require('path');

glob = require('glob');

exports.Application = class {
  constructor(input, output, compiler) {
    if (!input) {
      throw new Error(ERROR_CODES.INVALID_INPUT);
    }
    this.glob = input;
    this.output = output;
    this.compiler = compiler;
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
        results.push(this.process(file));
      }
      return results;
    });
  }

  // private
  process(file) {
    return fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      return this.writeFile({
        baseFile: file,
        newFileContent: this.compile(data)
      });
    });
  }

  writeFile(options) {
    var baseFile, newFileContent;
    baseFile = options.baseFile;
    newFileContent = options.newFileContent;
    return fs.mkdir(this.output, {
      recursive: true
    }, (_error) => {
      var outputFilePath;
      // Ignore `_error`. If there is an error, the output directory is already
      // created.
      outputFilePath = path.join(this.output, path.basename(baseFile));
      return fs.writeFile(outputFilePath, newFileContent, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  }

  compile(input) {
    return this.compiler.compile(input);
  }

};
