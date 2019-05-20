async = require("async")

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

  render: (ast, done) ->
    @renderer.buffer = ''
    @renderer.lastOut = '\n'

    walker = ast.walker()
    walk = =>
      event = walker.next()
      if event
        @compileNode event.node, event.entering, ->
          walk()
      else
        done(@renderer.buffer)
    walk()

  # private

  compileNode: (node, entering, done) ->
    @runTransformationsOn node, entering, (success) =>
      return done() if success

      # no filter ran for this node, run default renderer's method
      if typeof @renderer[node.type] is 'function'
        @renderer[node.type](node, entering)
        done()
      else
        throw new Error("Method not found. Please, implement `##{node.type}'")

  runTransformationsOn: (node, entering, done) ->
    async.map @transformations, (transformation, callback) =>
      @run transformation, node, entering, (success) ->
        callback(null, success)
    , (err, results) ->
      throw err if err
      done(results.some(Boolean))

  run: (transformation, node, entering, done) ->
    return done(false) unless transformation?[node.type]

    action = if entering then 'enter' else 'leave'
    if transformation[node.type][action]
      transformation[node.type][action].call(@renderer, node, done)
    else
      done(false)
