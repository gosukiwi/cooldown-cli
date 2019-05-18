// Translated to CoffeeScript from
// https://github.com/commonmark/commonmark.js/blob/c8798f34bf2e6c219ad477dfa5f1e52eb7ca57e4/lib/render/renderer.js

// Base `Renderer` class implementing the visitor pattern. It has some minor
// modifications.

exports.Renderer = class {
  // Walks the AST and calls member methods for each Node type.

  // @param ast {Node} The root of the abstract syntax tree.

  render(ast) {
    var event, walker;
    walker = ast.walker();
    this.buffer = '';
    this.lastOut = '\n';
    while ((event = walker.next())) {
      if (typeof this[event.node.type] === 'function') {
        this[event.node.type](event.node, event.entering);
      } else {
        throw new Error(`Method not found. Please, implement \`#${event.node.type}'`);
      }
    }
    return this.buffer;
  }

  // Concatenate a literal string to the buffer.

  // @param str {String} The string to concatenate.

  lit(str) {
    this.buffer += str;
    return this.lastOut = str;
  }

  // Output a newline to the buffer.

  cr() {
    if (this.lastOut !== '\n') {
      return this.lit('\n');
    }
  }

  // Concatenate a string to the buffer possibly escaping the content.

  // Concrete renderer implementations should override this method.

  // @param str {String} The string to concatenate.

  out(str) {
    return this.lit(this.esc(str));
  }

  // Escape a string for the target renderer.

  // Abstract function that should be implemented by concrete
  // renderer implementations.

  // @param str {String} The string to escape.

  esc(str) {
    return str;
  }

};
