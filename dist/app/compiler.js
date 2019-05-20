var MarkdownRenderer, RendererWithTransformations, commonmark;

({MarkdownRenderer} = require('./renderers/markdown-renderer'));

({RendererWithTransformations} = require('./renderers/renderer-with-transformations'));

commonmark = require('commonmark');

exports.Compiler = class {
  constructor(transformations) {
    this.renderer = new RendererWithTransformations(new MarkdownRenderer(), transformations);
    this.parser = new commonmark.Parser();
  }

  compile(input, done) {
    return this.renderer.render(this.parser.parse(input), done);
  }

};
