var NODE_TYPES, defineHookFunction;

NODE_TYPES = ['text', 'softbreak', 'linebreak', 'emph', 'strong', 'html_inline', 'link', 'image', 'code', 'document', 'paragraph', 'block_quote', 'item', 'list', 'heading', 'code_block', 'html_block', 'thematic_break'];

defineHookFunction = function(context, node_type) {
  return context[node_type] = function(node, entered) {
    var event;
    event = entered ? "entered" : "left";
    return context.trigger(event, node);
  };
};

exports.RendererObserver = class {
  constructor(renderer) {
    var i, len, type;
    this.renderer = renderer;
    this.callbacks = {};
    for (i = 0, len = NODE_TYPES.length; i < len; i++) {
      type = NODE_TYPES[i];
      defineHookFunction(this, type);
    }
  }

  trigger(event, ...args) {
    var callback, i, len, ref;
    ref = this.callbacks[event] || [];
    for (i = 0, len = ref.length; i < len; i++) {
      callback = ref[i];
      callback(...args);
    }
    return this;
  }

  on(event, callback) {
    if (this.callbacks[event] === void 0) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
    return this;
  }

};
