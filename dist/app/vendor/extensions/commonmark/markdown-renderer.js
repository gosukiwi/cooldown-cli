var DEFAULT_OPTIONS, Renderer, markdownEscape, potentiallyUnsafe, reSafeDataProtocol, reUnsafeProtocol;

({Renderer} = require('./renderer'));

markdownEscape = require('markdown-escape');

reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i;

reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i;

potentiallyUnsafe = function(url) {
  return reUnsafeProtocol.test(url) && !reSafeDataProtocol.test(url);
};

// TODO: For the join-sentences thing, we have to set `softbreak` to `""`. Do
// that in a transformation object/function.
DEFAULT_OPTIONS = {
  softbreak: '\n',
  safe: false // skips inline HTML
};

exports.MarkdownRenderer = class extends Renderer {
  constructor(options) {
    super();
    this.options = Object.assign(DEFAULT_OPTIONS, options);
    this.lastOut = '\n';
  }

  document() {}

  // NOOP
  text(node) {
    return this.putEscaped(node.literal);
  }

  softbreak() {
    return this.put(this.options.softbreak);
  }

  linebreak() {
    return this.cr();
  }

  emph(node, entering) {
    return this.put('_');
  }

  strong(node, entering) {
    return this.put('**');
  }

  html_inline(node) {
    if (this.options.safe) {
      return;
    }
    return this.put(node.literal);
  }

  link(node, entering) {
    return this.put(entering ? "[" : `${node.title}](${node.destination})`);
  }

  image(node, entering) {
    return this.put(entering ? `![${node.title}` : `](${node.destination})`);
  }

  code(node) {
    this.put("`");
    this.putEscaped(node.literal);
    return this.put("`");
  }

  paragraph(node, entering) {
    if (typeof grandparent !== "undefined" && grandparent !== null ? grandparent.listTight : void 0) {
      return;
    }
    if (!entering) {
      return this.put("\n\n");
    }
  }

  heading(node, entering) {
    var i, len, level, ref;
    if (entering) {
      ref = Array(node.level);
      for (i = 0, len = ref.length; i < len; i++) {
        level = ref[i];
        this.put("#");
      }
      return this.put(" ");
    }
  }

  //code_block: (node) ->
  //  info_words = if node.info then node.info.split(/\s+/) else []
  //  attrs = @attrs(node)
  //  if info_words.length > 0 and info_words[0].length > 0
  //    attrs.push [
  //      'class'
  //      'language-' + @esc(info_words[0], false)
  //    ]
  //  @cr()
  //  @tag 'pre'
  //  @tag 'code', attrs
  //  @putEscaped node.literal
  //  @tag '/code'
  //  @tag '/pre'
  //  @cr()
  thematic_break(node) {
    this.put("---");
    return this.put("\n\n");
  }

  block_quote(node, entering) {
    if (entering) {
      this.cr();
      return this.put('> ');
    } else {
      return this.cr();
    }
  }

  //list: (node, entering) ->
  //  tagname = if node.listType == 'bullet' then 'ul' else 'ol'
  //  attrs = @attrs(node)
  //  if entering
  //    start = node.listStart
  //    if start != null and start != 1
  //      attrs.push [
  //        'start'
  //        start.toString()
  //      ]
  //    @cr()
  //    @tag tagname, attrs
  //    @cr()
  //  else
  //    @cr()
  //    @tag '/' + tagname
  //    @cr()
  item(node, entering) {
    if (entering) {
      return this.put("* ");
    } else {
      return this.cr();
    }
  }

  html_block(node) {
    if (this.options.safe) {
      return;
    }
    this.cr();
    this.put(node.literal);
    return this.cr();
  }

  // private
  esc(str) {
    return markdownEscape(str);
  }

  // alias of `out`
  putEscaped(str) {
    return this.out(str);
  }

  // alias of `lit`
  put(str) {
    return this.lit(str);
  }

  // TODO: Delete this method
  tag(name) {
    return this.put(`[${name}]`);
  }

};
