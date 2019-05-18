{ Renderer } = require('./renderer')
markdownEscape = require('markdown-escape')
reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i
reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i

potentiallyUnsafe = (url) ->
  reUnsafeProtocol.test(url) and !reSafeDataProtocol.test(url)

# TODO: For the join-sentences thing, we have to set `softbreak` to `""`. Do
# that in a transformation object/function.
DEFAULT_OPTIONS =
  softbreak: '\n'
  safe: false # skips inline HTML

exports.MarkdownRenderer = class extends Renderer
  constructor: (options) ->
    super()
    @options = Object.assign DEFAULT_OPTIONS, options
    @lastOut = '\n'

  document: ->
    # NOOP

  text: (node) ->
    @putEscaped node.literal

  softbreak: ->
    @put @options.softbreak

  linebreak: ->
    @cr()

  emph: (node, entering) ->
    @put '_'

  strong: (node, entering) ->
    @put '**'

  html_inline: (node) ->
    return if @options.safe
    @put node.literal

  link: (node, entering) ->
    @put if entering
      "["
    else
      "#{node.title}](#{node.destination})"

  image: (node, entering) ->
    @put if entering
      "![#{node.title}"
    else
      "](#{node.destination})"

  code: (node) ->
    @put "`"
    @putEscaped node.literal
    @put "`"

  paragraph: (node, entering) ->
    return if grandparent?.listTight
    @put "\n\n" unless entering

  heading: (node, entering) ->
    if entering
      @put "#" for level in Array(node.level)
      @put " "

  code_block: (node) ->
    info_words = if node.info then node.info.split(/\s+/) else []
    language = @esc(info_words[0] || "")
    @cr()
    @put "```#{language}"
    @cr()
    @putEscaped node.literal
    @put "```"
    @put "\n\n"

  thematic_break: (node) ->
    @put "---\n\n"

  block_quote: (node, entering) ->
    if entering
      @put '> '

  #   list: (node, entering) ->
  #  tagname = if node.listType == 'bullet' then 'ul' else 'ol'
  #  attrs = @attrs(node)
  #  if entering
  #    start = node.listStart
  #    if start != null and start != 1
  #      attrs.push [
  #        'start'
  #        start.toString()
  #      ]
  #    @cr()
  #    @tag tagname, attrs
  #    @cr()
  #  else
  #    @cr()
  #    @tag '/' + tagname
  #    @cr()

  item: (node, entering) ->
    if entering
      @put "* "
    else
      @cr()

  html_block: (node) ->
    return if @options.safe

    @cr()
    @put node.literal
    @cr()

  # private

  esc: (str) ->
    markdownEscape str

  # alias of `out`
  putEscaped: (str) ->
    @out str

  # alias of `lit`
  put: (str) ->
    @lit str

  # TODO: Delete this method
  tag: (name) ->
    @put "[#{name}]"
