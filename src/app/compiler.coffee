{ TransformableMarkdownRenderer } = require('./renderers/transformable-markdown-renderer')
commonmark = require('commonmark')
async = require('async')

exports.Compiler = class
  constructor: (transformations) ->
    @transformations = transformations
    @renderer = new TransformableMarkdownRenderer(transformations)
    @parser   = new commonmark.Parser()

  compile: (input, done) ->
    @renderer.render @parser.parse(input), done
