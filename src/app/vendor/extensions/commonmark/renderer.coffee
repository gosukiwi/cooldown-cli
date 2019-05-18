# Translated to CoffeeScript from
# https://github.com/commonmark/commonmark.js/blob/c8798f34bf2e6c219ad477dfa5f1e52eb7ca57e4/lib/render/renderer.js
#
# Base `Renderer` class implementing the visitor pattern. It has some minor
# modifications.
#
exports.Renderer = class
  # Walks the AST and calls member methods for each Node type.
  #
  # @param ast {Node} The root of the abstract syntax tree.
  #
  render: (ast) ->
    walker = ast.walker()
    @buffer = ''
    @lastOut = '\n'

    while (event = walker.next())
      if typeof this[event.node.type] is 'function'
        this[event.node.type](event.node, event.entering)
      else
        throw new Error("Method not found. Please, implement `##{event.node.type}'")

    @buffer

  # Concatenate a literal string to the buffer.
  #
  # @param str {String} The string to concatenate.
  #
  lit: (str) ->
    @buffer += str
    @lastOut = str

  # Output a newline to the buffer.
  #
  cr: ->
    @lit('\n') unless @lastOut is '\n'

  # Concatenate a string to the buffer possibly escaping the content.
  #
  # Concrete renderer implementations should override this method.
  #
  # @param str {String} The string to concatenate.
  #
  out: (str) ->
    @lit @esc(str)

  # Escape a string for the target renderer.
  #
  # Abstract function that should be implemented by concrete
  # renderer implementations.
  #
  # @param str {String} The string to escape.
  #
  esc: (str) ->
    str
