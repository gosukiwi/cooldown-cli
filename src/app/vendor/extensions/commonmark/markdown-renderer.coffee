{ Renderer } = require('./renderer')
markdownEscape = require('markdown-escape')
reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i
reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i

potentiallyUnsafe = (url) ->
  reUnsafeProtocol.test(url) and !reSafeDataProtocol.test(url)

exports.MarkdownRenderer = class extends Renderer
  constructor: (options) ->
    super()

    # TODO: For the join-sentences thing, we have to set `softbreak` to `""`. Do
    # that in a transformation object/function.
    defaultOptions =
      softbreak: '\n'
      safe: false # skips inline HTML

    @options = Object.assign defaultOptions, options
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
      "[#{node.destination}]("
    else
      " \"#{node.title})\")"

  image: (node, entering) ->
    # if entering
    #   if @disableTags == 0
    #     if @options.safe and potentiallyUnsafe(node.destination)
    #       @put '<img src="" alt="'
    #     else
    #       @put '<img src="' + @esc(node.destination, false) + '" alt="'
    #   @disableTags += 1
    # else
    #   @disableTags -= 1
    #   if @disableTags == 0
    #     if node.title
    #       @put '" title="' + @esc(node.title, false)
    #     @put '" />'
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

  #code_block: (node) ->
  #  info_words = if node.info then node.info.split(/\s+/) else []
  #  attrs = @attrs(node)
  #  if info_words.length > 0 and info_words[0].length > 0
  #    attrs.push [
  #      'class'
  #      'language-' + @esc(info_words[0], false)
  #    ]
  #  @cr()
  #  @tag 'pre'
  #  @tag 'code', attrs
  #  @putEscaped node.literal
  #  @tag '/code'
  #  @tag '/pre'
  #  @cr()

  thematic_break: (node) ->
    @cr()
    @put "---"
    @cr()

  block_quote: (node, entering) ->
    if entering
      @cr()
      @put '> '
    else
      @cr()

  #list: (node, entering) ->
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

  custom_inline: (node, entering) ->
    if entering and node.onEnter
      @put node.onEnter
    else if !entering and node.onExit
      @put node.onExit

  custom_block: (node, entering) ->
    @cr()
    if entering and node.onEnter
      @put node.onEnter
    else if !entering and node.onExit
      @put node.onExit
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
