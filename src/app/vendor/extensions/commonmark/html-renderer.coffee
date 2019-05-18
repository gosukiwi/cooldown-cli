# This class was translated to CoffeeSCript from
# https://github.com/commonmark/commonmark.js/blob/master/lib/render/html.js
#
# Note that the `esc` function was removed because of dependency reasons, this
# is  just a toy implementation to use as reference.
#
{ Renderer } = require('./renderer')
reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i
reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i

potentiallyUnsafe = (url) ->
  reUnsafeProtocol.test(url) and !reSafeDataProtocol.test(url)

exports.HtmlRenderer = class extends Renderer
  constructor: (options) ->
    super()
    options = options or {}
    # by default, soft breaks are rendered as newlines in HTML
    options.softbreak = options.softbreak or '\n'
    # set to "<br />" to make them hard breaks
    # set to " " if you want to ignore line wrapping in source
    @disableTags = 0
    @lastOut = '\n'
    @options = options

  text: (node) ->
    @out node.literal
    return

  softbreak: ->
    @lit @options.softbreak
    return

  linebreak: ->
    @tag 'br', [], true
    @cr()
    return

  link: (node, entering) ->
    attrs = @attrs(node)
    if entering
      if !(@options.safe and potentiallyUnsafe(node.destination))
        attrs.push [
          'href'
          @esc(node.destination, false)
        ]
      if node.title
        attrs.push [
          'title'
          @esc(node.title, false)
        ]
      @tag 'a', attrs
    else
      @tag '/a'
    return

  image: (node, entering) ->
    if entering
      if @disableTags == 0
        if @options.safe and potentiallyUnsafe(node.destination)
          @lit '<img src="" alt="'
        else
          @lit '<img src="' + @esc(node.destination, false) + '" alt="'
      @disableTags += 1
    else
      @disableTags -= 1
      if @disableTags == 0
        if node.title
          @lit '" title="' + @esc(node.title, false)
        @lit '" />'
    return

  emph: (node, entering) ->
    @tag if entering then 'em' else '/em'
    return

  strong: (node, entering) ->
    @tag if entering then 'strong' else '/strong'
    return

  paragraph = (node, entering) ->
    grandparent = node.parent.parent
    attrs = @attrs(node)
    if grandparent != null and grandparent.type == 'list'
      if grandparent.listTight
        return
    if entering
      @cr()
      @tag 'p', attrs
    else
      @tag '/p'
      @cr()
    return

  heading: (node, entering) ->
    tagname = 'h' + node.level
    attrs = @attrs(node)
    if entering
      @cr()
      @tag tagname, attrs
    else
      @tag '/' + tagname
      @cr()
    return

  code: (node) ->
    @tag 'code'
    @out node.literal
    @tag '/code'
    return

  code_block: (node) ->
    info_words = if node.info then node.info.split(/\s+/) else []
    attrs = @attrs(node)
    if info_words.length > 0 and info_words[0].length > 0
      attrs.push [
        'class'
        'language-' + @esc(info_words[0], false)
      ]
    @cr()
    @tag 'pre'
    @tag 'code', attrs
    @out node.literal
    @tag '/code'
    @tag '/pre'
    @cr()
    return

  thematic_break: (node) ->
    attrs = @attrs(node)
    @cr()
    @tag 'hr', attrs, true
    @cr()
    return

  block_quote: (node, entering) ->
    attrs = @attrs(node)
    if entering
      @cr()
      @tag 'blockquote', attrs
      @cr()
    else
      @cr()
      @tag '/blockquote'
      @cr()
    return

  list: (node, entering) ->
    tagname = if node.listType == 'bullet' then 'ul' else 'ol'
    attrs = @attrs(node)
    if entering
      start = node.listStart
      if start != null and start != 1
        attrs.push [
          'start'
          start.toString()
        ]
      @cr()
      @tag tagname, attrs
      @cr()
    else
      @cr()
      @tag '/' + tagname
      @cr()
    return

  item: (node, entering) ->
    attrs = @attrs(node)
    if entering
      @tag 'li', attrs
    else
      @tag '/li'
      @cr()
    return

  html_inline: (node) ->
    if @options.safe
      @lit '<!-- raw HTML omitted -->'
    else
      @lit node.literal
    return

  html_block: (node) ->
    @cr()
    if @options.safe
      @lit '<!-- raw HTML omitted -->'
    else
      @lit node.literal
    @cr()
    return

  custom_inline: (node, entering) ->
    if entering and node.onEnter
      @lit node.onEnter
    else if !entering and node.onExit
      @lit node.onExit
    return

  custom_block: (node, entering) ->
    @cr()
    if entering and node.onEnter
      @lit node.onEnter
    else if !entering and node.onExit
      @lit node.onExit
    @cr()
    return

  ### Helper methods ###

  tag: (name, attrs, selfclosing) ->
    if @disableTags > 0
      return
    @buffer += '<' + name
    if attrs and attrs.length > 0
      i = 0
      attrib = undefined
      while (attrib = attrs[i]) != undefined
        @buffer += ' ' + attrib[0] + '="' + attrib[1] + '"'
        i++
    if selfclosing
      @buffer += ' /'
    @buffer += '>'
    @lastOut = '>'
    return

  attrs: (node) ->
    att = []
    if @options.sourcepos
      pos = node.sourcepos
      if pos
        att.push [
          'data-sourcepos'
          String(pos[0][0]) + ':' + String(pos[0][1]) + '-' + String(pos[1][0]) + ':' + String(pos[1][1])
        ]
    att
