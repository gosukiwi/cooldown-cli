var async;

async = require("async");

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

  render(ast, done) {
    var walk, walker;
    this.renderer.buffer = '';
    this.renderer.lastOut = '\n';
    walker = ast.walker();
    walk = () => {
      var event;
      event = walker.next();
      if (event) {
        return this.compileNode(event.node, event.entering, function() {
          return walk();
        });
      } else {
        return this.cleanup(() => {
          return done(this.renderer.buffer.trim());
        });
      }
    };
    return walk();
  }

  // private
  compileNode(node, entering, done) {
    return this.runTransformationsOn(node, entering, (success) => {
      if (success) {
        return done();
      }
      // no filter ran for this node, run default renderer's method
      if (typeof this.renderer[node.type] === 'function') {
        this.renderer[node.type](node, entering);
        return done();
      } else {
        throw new Error(`Method not found. Please, implement \`#${node.type}'`);
      }
    });
  }

  runTransformationsOn(node, entering, done) {
    return async.map(this.transformations, (transformation, _done) => {
      return this.run(transformation, node, entering, function(success) {
        return _done(null, success);
      });
    }, function(err, results) {
      if (err) {
        throw err;
      }
      return done(results.some(Boolean));
    });
  }

  run(transformation, node, entering, done) {
    var action;
    if (!(transformation != null ? transformation[node.type] : void 0)) {
      return done(false);
    }
    action = entering ? 'enter' : 'leave';
    if (typeof transformation[node.type][action] === 'function') {
      return transformation[node.type][action].call(this.renderer, node, function() {
        return done(true);
      });
    } else {
      return done(false);
    }
  }

  cleanup(done) {
    return async.each(this.transformations, (transformation, _done) => {
      if (typeof transformation.finally === 'function') {
        return transformation.finally.call(this.renderer, _done);
      } else {
        return _done();
      }
    }, function(err) {
      if (err) {
        throw err;
      }
      return done();
    });
  }

};
