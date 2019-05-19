# This class takes a renderer and a collection of transformations. Then when
# rendering the AST, for each node type, it will run all relevant
# transformations on that node.
#
# Each transformation is a function which is applied in the context of the
# renderer, so it has access to all it's properties and methods, just like any
# other method.
#
# If a transformation was not defined for a particular node type, it defaults to
# running the renderer's method instead.
#
exports.RendererWithTransformations = class
  constructor: (renderer, transformations) ->
    @renderer        = renderer
    @transformations = transformations

  render: (ast) ->
    @renderer.buffer = ''
    @renderer.lastOut = '\n'

    walker = ast.walker()
    while (event = walker.next())
      @compileNode event.node, event.entering

    @renderer.buffer

  # private

  compileNode: (node, entering) ->
    anyTransformationWasRun = @runTransformationsOn(node, entering)
    return if anyTransformationWasRun

    if typeof @renderer[node.type] is 'function'
      @renderer[node.type](node, entering)
    else
      throw new Error("Method not found. Please, implement `##{node.type}'")

  runTransformationsOn: (node, entering) ->
    (@run(transformation, node, entering) for transformation in @transformations).some(Boolean)

  run: (transformation, node, entering) ->
    return false unless transformation?[node.type]

    action = if entering then 'enter' else 'leave'
    if transformation[node.type][action]
      transformation[node.type][action].call(@renderer, node)
      true
    else
      false
