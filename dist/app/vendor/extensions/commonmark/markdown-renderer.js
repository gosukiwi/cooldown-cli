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
    this.listTypeTags = [];
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
    var ref, ref1;
    if (entering) {
      return;
    }
    return this.put(((ref = node.parent) != null ? (ref1 = ref.parent) != null ? ref1.listTight : void 0 : void 0) ? "\n" : "\n\n");
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

  code_block(node) {
    var info_words, language;
    info_words = node.info ? node.info.split(/\s+/) : [];
    language = this.esc(info_words[0] || "");
    this.cr();
    this.put(`\`\`\`${language}`);
    this.cr();
    this.putEscaped(node.literal);
    this.put("```");
    return this.put("\n\n");
  }

  thematic_break(node) {
    return this.put("---\n\n");
  }

  block_quote(node, entering) {
    if (entering) {
      return this.put('> ');
    }
  }

  list(node, entering) {
    var tag;
    if (entering) {
      tag = node.listType === 'bullet' ? '*' : '1.';
      return this.listTypeTags.push(tag);
    } else {
      this.listTypeTags.pop();
      return this.put("\n"); // this is an extra newline
    }
  }

  item(node, entering) {
    var tag;
    tag = this.listTypeTags[this.listTypeTags.length - 1];
    if (entering) {
      return this.put(`${tag} `);
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
