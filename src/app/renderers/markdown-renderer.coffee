{ Renderer } = require('./renderer')
markdownEscape = require('markdown-escape')

exports.MarkdownRenderer = class extends Renderer
  constructor: ->
    super()
    @lastOut = '\n'
    @listTypeTags = []

  document: ->
    # NOOP

  text: (node) ->
    @putEscaped node.literal

  softbreak: ->
    @put "\n"

  linebreak: ->
    @cr()

  emph: (node, entering) ->
    @put '_'

  strong: (node, entering) ->
    @put '**'

  html_inline: (node) ->
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
    @put "`#{node.literal}`"

  paragraph: (node, entering) ->
    return if entering

    @put if node.parent?.parent?.listTight
      "\n"
    else
      "\n\n"

  heading: (node, entering) ->
    if entering
      @put "#" for level in Array(node.level)
      @put " "
    else
      @cr()

  code_block: (node, entering) ->
    info_words = if node.info then node.info.split(/\s+/) else []
    language = info_words[0] || ""
    @put "```#{language}"
    @cr()
    @put node.literal
    @put "```"
    @put "\n\n"

  thematic_break: (node) ->
    @put "---\n\n"

  block_quote: (node, entering) ->
    if entering
      @put '> '

  list: (node, entering) ->
    if entering
      tag = if node.listType is 'bullet' then '*' else '1.'
      @listTypeTags.push(tag)
    else
      @listTypeTags.pop()
      @put "\n" # this is an extra newline

  item: (node, entering) ->
    tag = @listTypeTags[@listTypeTags.length - 1]
    @put "#{tag} " if entering

  html_block: (node) ->
    @cr()
    @put node.literal
    @cr()

  # private

  # alias of `out`
  putEscaped: (str) ->
    @out str

  # alias of `lit`
  put: (str) ->
    @lit str

  esc: (str) ->
    markdownEscape(str)
