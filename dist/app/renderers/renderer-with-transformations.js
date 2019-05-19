// This class takes a renderer and a collection of transformations. Then when
// rendering the AST, for each node type, it will run all relevant
// transformations on that node.

// Each transformation is a function which is applied in the context of the
// renderer, so it has access to all it's properties and methods, just like any
// other method.

// If a transformation was not defined for a particular node type, it defaults to
// running the renderer's method instead.

exports.RendererWithTransformations = class {
  constructor(renderer, transformations) {
    this.renderer = renderer;
    this.transformations = transformations;
  }

  render(ast) {
    var event, walker;
    this.renderer.buffer = '';
    this.renderer.lastOut = '\n';
    walker = ast.walker();
    while ((event = walker.next())) {
      this.compileNode(event.node, event.entering);
    }
    return this.renderer.buffer;
  }

  // private
  compileNode(node, entering) {
    var anyTransformationWasRun;
    anyTransformationWasRun = this.runTransformationsOn(node, entering);
    if (anyTransformationWasRun) {
      return;
    }
    if (typeof this.renderer[node.type] === 'function') {
      return this.renderer[node.type](node, entering);
    } else {
      throw new Error(`Method not found. Please, implement \`#${node.type}'`);
    }
  }

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
    if (!(transformation != null ? transformation[node.type] : void 0)) {
      return false;
    }
    action = entering ? 'enter' : 'leave';
    if (transformation[node.type][action]) {
      transformation[node.type][action].call(this.renderer, node);
      return true;
    } else {
      return false;
    }
  }

};
