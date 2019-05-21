var MarkdownRenderer, RendererWithTransformations, async, commonmark;

({MarkdownRenderer} = require('./renderers/markdown-renderer'));

({RendererWithTransformations} = require('./renderers/renderer-with-transformations'));

commonmark = require('commonmark');

async = require('async');

exports.Compiler = class {
  constructor(transformations) {
    this.transformations = transformations;
    this.renderer = new RendererWithTransformations(new MarkdownRenderer(), transformations);
    this.parser = new commonmark.Parser();
  }

  compile(input, done) {
    return this.renderer.render(this.parser.parse(input), done);
  }

  cleanup(done) {
    return async.each(this.transformations, function(transformation, callback) {
      if (typeof transformation.finally === 'function') {
        return typeof transformation.finally === "function" ? transformation.finally(callback) : void 0;
      } else {
        return callback();
      }
    }, function(err) {
      if (err) {
        throw err;
      }
      return done();
    });
  }

};
