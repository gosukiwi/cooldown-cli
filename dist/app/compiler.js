var TransformableMarkdownRenderer, async, commonmark;

({TransformableMarkdownRenderer} = require('./renderers/transformable-markdown-renderer'));

commonmark = require('commonmark');

async = require('async');

exports.Compiler = class {
  constructor(transformations) {
    this.transformations = transformations;
    this.renderer = new TransformableMarkdownRenderer(transformations);
    this.parser = new commonmark.Parser();
  }

  compile(input, done) {
    return this.renderer.render(this.parser.parse(input), done);
  }

};
