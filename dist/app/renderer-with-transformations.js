var MarkdownRenderer, RendererObserver, commonmark;

commonmark = require('commonmark');

({MarkdownRenderer} = require('./vendor/extensions/commonmark/markdown-renderer'));

({RendererObserver} = require('./renderer-observer'));

exports.RendererWithTransformations = class {
  constructor(renderer, transformations) {
    this.renderer = renderer;
    this.transformations = transformations;
  }

  render(ast) {
    var atLeastOneTransformationWasRun, event, walker;
    this.renderer.render(ast);
    walker = ast.walker();
    this.renderer.buffer = '';
    this.renderer.lastOut = '\n';
    while ((event = walker.next())) {
      atLeastOneTransformationWasRun = this.runTransformationsOn(event.node, event.entering);
      if (!atLeastOneTransformationWasRun) {
        if (typeof this.renderer[event.node.type] === 'function') {
          this.renderer[event.node.type](event.node, event.entering);
        } else {
          throw new Error(`Method not found. Please, implement \`#${event.node.type}'`);
        }
      }
    }
    return this.renderer.buffer;
  }

  // private
  runTransformationsOn(node, entering) {
    var transformation;
    return ((function() {
      var i, len, ref, results;
      ref = this.transformations;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        transformation = ref[i];
        results.push(this.run(transformation, node, entering));
      }
      return results;
    }).call(this)).some(Boolean);
  }

  run(transformation, node, entering) {
    var action;
    if (!transformation[node.type]) {
      return false;
    }
    action = entering ? 'enter' : 'leave';
    if (transformation[node.type][action]) {
      console.log('apply transformation', transformation[node.type][action]);
      transformation[node.type][action].apply(this.renderer, node);
      return true;
    } else {
      return false;
    }
  }

};
