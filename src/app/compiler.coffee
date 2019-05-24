{ MarkdownRenderer } = require('./renderers/markdown-renderer')
{ RendererWithTransformations } = require('./renderers/renderer-with-transformations')
commonmark = require('commonmark')
async = require('async')

exports.Compiler = class
  constructor: (transformations) ->
    @transformations = transformations
    @renderer = new RendererWithTransformations(new MarkdownRenderer(), transformations)
    @parser   = new commonmark.Parser()

  compile: (input, done) ->
    @renderer.render @parser.parse(input), done
