async = require("async")
{ MarkdownRenderer } = require('./markdown-renderer')

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
exports.TransformableMarkdownRenderer = class extends MarkdownRenderer
  constructor: (transformations) ->
    super()
    @transformations = transformations

  render: (ast, done) ->
    @buffer = ''
    @lastOut = '\n'

    walker = ast.walker()
    walk = =>
      event = walker.next()
      if event
        @compileNode event.node, event.entering, ->
          walk()
      else
        @cleanup =>
          done(@buffer.trim())
    walk()

  # private

  compileNode: (node, entering, done) ->
    @runTransformationsOn node, entering, (success) =>
      return done() if success

      # no filter ran for this node, run default renderer's method
      if typeof this[node.type] is 'function'
        this[node.type](node, entering)
        done()
      else
        throw new Error("Method not found. Please, implement `##{node.type}'")

  runTransformationsOn: (node, entering, done) ->
    async.map @transformations, (transformation, _done) =>
      @run transformation, node, entering, (success) ->
        _done(null, success)
    , (err, results) ->
      throw err if err
      done(results.some(Boolean))

  run: (transformation, node, entering, done) ->
    return done(false) unless transformation?[node.type]

    action = if entering then 'enter' else 'leave'
    if typeof transformation[node.type][action] is 'function'
      transformation[node.type][action].call(this, node, -> done(true))
    else
      done(false)

  cleanup: (done) ->
    async.each @transformations, (transformation, _done) =>
      if typeof transformation.finally is 'function'
        transformation.finally.call(this, _done)
      else
        _done()
    , (err) ->
      throw err if err
      done()
