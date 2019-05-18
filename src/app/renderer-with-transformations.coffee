commonmark = require('commonmark')
{ MarkdownRenderer } = require('./vendor/extensions/commonmark/markdown-renderer')
{ RendererObserver } = require('./renderer-observer')

exports.RendererWithTransformations = class
  constructor: (renderer, transformations) ->
    @renderer        = renderer
    @transformations = transformations

  render: (ast) ->
    @renderer.render ast

    walker = ast.walker()
    @renderer.buffer = ''
    @renderer.lastOut = '\n'

    while (event = walker.next())
      atLeastOneTransformationWasRun = @runTransformationsOn(event.node, event.entering)
      unless atLeastOneTransformationWasRun
        if typeof @renderer[event.node.type] is 'function'
          @renderer[event.node.type](event.node, event.entering)
        else
          throw new Error("Method not found. Please, implement `##{event.node.type}'")

    @renderer.buffer

  # private

  runTransformationsOn: (node, entering) ->
    (@run(transformation, node, entering) for transformation in @transformations).some(Boolean)

  run: (transformation, node, entering) ->
    return false unless transformation[node.type]

    action = if entering then 'enter' else 'leave'
    if transformation[node.type][action]
      console.log 'apply transformation', transformation[node.type][action]
      transformation[node.type][action].apply @renderer, node
      true
    else
      false
