NODE_TYPES = [
  'text', 'softbreak', 'linebreak', 'emph', 'strong', 'html_inline', 'link',
  'image', 'code', 'document', 'paragraph', 'block_quote', 'item', 'list',
  'heading', 'code_block', 'html_block', 'thematic_break'
]

defineHookFunction = (context, node_type) ->
  context[node_type] = (node, entered) ->
    event = if entered then "entered" else "left"
    context.trigger event, node

exports.RendererObserver = class
  constructor: (renderer) ->
    @renderer = renderer
    @callbacks = {}
    defineHookFunction(this, type) for type in NODE_TYPES

  trigger: (event, args...) ->
    callback(args...) for callback in (@callbacks[event] or [])
    this

  on: (event, callback) ->
    @callbacks[event] = [] if @callbacks[event] is undefined
    @callbacks[event].push callback
    this
