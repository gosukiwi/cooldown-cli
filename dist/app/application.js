var InvalidInputError, async, fs, glob, path;

({InvalidInputError} = require('./errors'));

fs = require('fs');

path = require('path');

glob = require('glob');

async = require("async");

exports.Application = class {
  constructor(input, output, compiler) {
    if (!input) {
      throw new InvalidInputError;
    }
    this.glob = input;
    this.output = output;
    this.compiler = compiler;
  }

  run(done) {
    this.mkdir();
    return glob(this.glob, {}, (err, files) => {
      if (err) {
        throw err;
      }
      return async.each(files, (file, _done) => {
        return this.process(file, _done);
      }, (err) => {
        if (err) {
          throw err;
        }
        return done();
      });
    });
  }

  // private
  process(file, _done) {
    var data;
    data = fs.readFileSync(file, 'utf8');
    return this.compile(data, (content) => {
      this.write({
        baseFile: file,
        newFileContent: content
      });
      return _done();
    });
  }

  write(options) {
    var baseFile, newFileContent;
    baseFile = options.baseFile;
    newFileContent = options.newFileContent;
    return fs.writeFileSync(path.join(this.output, path.basename(baseFile)), newFileContent);
  }

  mkdir() {
    try {
      return fs.mkdirSync(this.output, {
        recursive: true
      });
    } catch (error) {

    }
  }

  // I don't care
  compile(input, done) {
    return this.compiler.compile(input, done);
  }

};
