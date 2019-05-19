{ MarkdownRenderer } = require('./renderers/markdown-renderer')
{ RendererWithTransformations } = require('./renderers/renderer-with-transformations')
commonmark = require('commonmark')

exports.Compiler = class
  constructor: (transformations) ->
    @renderer = new RendererWithTransformations(new MarkdownRenderer(), transformations)
    @parser   = new commonmark.Parser()

  compile: (input) ->
    @renderer.render @parser.parse(input)
