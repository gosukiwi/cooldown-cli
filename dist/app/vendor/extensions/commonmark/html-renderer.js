// This class was translated to CoffeeSCript from
// https://github.com/commonmark/commonmark.js/blob/master/lib/render/html.js

// Note that the `esc` function was removed because of dependency reasons, this
// is  just a toy implementation to use as reference.

var Renderer, potentiallyUnsafe, reSafeDataProtocol, reUnsafeProtocol;

({Renderer} = require('./renderer'));

reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i;

reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i;

potentiallyUnsafe = function(url) {
  return reUnsafeProtocol.test(url) && !reSafeDataProtocol.test(url);
};

exports.HtmlRenderer = (function() {
  var _Class, paragraph;

  _Class = class extends Renderer {
    constructor(options) {
      super();
      options = options || {};
      // by default, soft breaks are rendered as newlines in HTML
      options.softbreak = options.softbreak || '\n';
      // set to "<br />" to make them hard breaks
      // set to " " if you want to ignore line wrapping in source
      this.disableTags = 0;
      this.lastOut = '\n';
      this.options = options;
    }

    text(node) {
      this.out(node.literal);
    }

    softbreak() {
      this.lit(this.options.softbreak);
    }

    linebreak() {
      this.tag('br', [], true);
      this.cr();
    }

    link(node, entering) {
      var attrs;
      attrs = this.attrs(node);
      if (entering) {
        if (!(this.options.safe && potentiallyUnsafe(node.destination))) {
          attrs.push(['href', this.esc(node.destination, false)]);
        }
        if (node.title) {
          attrs.push(['title', this.esc(node.title, false)]);
        }
        this.tag('a', attrs);
      } else {
        this.tag('/a');
      }
    }

    image(node, entering) {
      if (entering) {
        if (this.disableTags === 0) {
          if (this.options.safe && potentiallyUnsafe(node.destination)) {
            this.lit('<img src="" alt="');
          } else {
            this.lit('<img src="' + this.esc(node.destination, false) + '" alt="');
          }
        }
        this.disableTags += 1;
      } else {
        this.disableTags -= 1;
        if (this.disableTags === 0) {
          if (node.title) {
            this.lit('" title="' + this.esc(node.title, false));
          }
          this.lit('" />');
        }
      }
    }

    emph(node, entering) {
      this.tag(entering ? 'em' : '/em');
    }

    strong(node, entering) {
      this.tag(entering ? 'strong' : '/strong');
    }

    heading(node, entering) {
      var attrs, tagname;
      tagname = 'h' + node.level;
      attrs = this.attrs(node);
      if (entering) {
        this.cr();
        this.tag(tagname, attrs);
      } else {
        this.tag('/' + tagname);
        this.cr();
      }
    }

    code(node) {
      this.tag('code');
      this.out(node.literal);
      this.tag('/code');
    }

    code_block(node) {
      var attrs, info_words;
      info_words = node.info ? node.info.split(/\s+/) : [];
      attrs = this.attrs(node);
      if (info_words.length > 0 && info_words[0].length > 0) {
        attrs.push(['class', 'language-' + this.esc(info_words[0], false)]);
      }
      this.cr();
      this.tag('pre');
      this.tag('code', attrs);
      this.out(node.literal);
      this.tag('/code');
      this.tag('/pre');
      this.cr();
    }

    thematic_break(node) {
      var attrs;
      attrs = this.attrs(node);
      this.cr();
      this.tag('hr', attrs, true);
      this.cr();
    }

    block_quote(node, entering) {
      var attrs;
      attrs = this.attrs(node);
      if (entering) {
        this.cr();
        this.tag('blockquote', attrs);
        this.cr();
      } else {
        this.cr();
        this.tag('/blockquote');
        this.cr();
      }
    }

    list(node, entering) {
      var attrs, start, tagname;
      tagname = node.listType === 'bullet' ? 'ul' : 'ol';
      attrs = this.attrs(node);
      if (entering) {
        start = node.listStart;
        if (start !== null && start !== 1) {
          attrs.push(['start', start.toString()]);
        }
        this.cr();
        this.tag(tagname, attrs);
        this.cr();
      } else {
        this.cr();
        this.tag('/' + tagname);
        this.cr();
      }
    }

    item(node, entering) {
      var attrs;
      attrs = this.attrs(node);
      if (entering) {
        this.tag('li', attrs);
      } else {
        this.tag('/li');
        this.cr();
      }
    }

    html_inline(node) {
      if (this.options.safe) {
        this.lit('<!-- raw HTML omitted -->');
      } else {
        this.lit(node.literal);
      }
    }

    html_block(node) {
      this.cr();
      if (this.options.safe) {
        this.lit('<!-- raw HTML omitted -->');
      } else {
        this.lit(node.literal);
      }
      this.cr();
    }

    custom_inline(node, entering) {
      if (entering && node.onEnter) {
        this.lit(node.onEnter);
      } else if (!entering && node.onExit) {
        this.lit(node.onExit);
      }
    }

    custom_block(node, entering) {
      this.cr();
      if (entering && node.onEnter) {
        this.lit(node.onEnter);
      } else if (!entering && node.onExit) {
        this.lit(node.onExit);
      }
      this.cr();
    }

    /* Helper methods */
    tag(name, attrs, selfclosing) {
      var attrib, i;
      if (this.disableTags > 0) {
        return;
      }
      this.buffer += '<' + name;
      if (attrs && attrs.length > 0) {
        i = 0;
        attrib = void 0;
        while ((attrib = attrs[i]) !== void 0) {
          this.buffer += ' ' + attrib[0] + '="' + attrib[1] + '"';
          i++;
        }
      }
      if (selfclosing) {
        this.buffer += ' /';
      }
      this.buffer += '>';
      this.lastOut = '>';
    }

    attrs(node) {
      var att, pos;
      att = [];
      if (this.options.sourcepos) {
        pos = node.sourcepos;
        if (pos) {
          att.push(['data-sourcepos', String(pos[0][0]) + ':' + String(pos[0][1]) + '-' + String(pos[1][0]) + ':' + String(pos[1][1])]);
        }
      }
      return att;
    }

  };

  paragraph = function(node, entering) {
    var attrs, grandparent;
    grandparent = node.parent.parent;
    attrs = this.attrs(node);
    if (grandparent !== null && grandparent.type === 'list') {
      if (grandparent.listTight) {
        return;
      }
    }
    if (entering) {
      this.cr();
      this.tag('p', attrs);
    } else {
      this.tag('/p');
      this.cr();
    }
  };

  return _Class;

}).call(this);
