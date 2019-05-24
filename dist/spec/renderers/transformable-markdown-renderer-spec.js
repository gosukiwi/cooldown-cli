var TransformableMarkdownRenderer, dummyAstWalker, timesRun;

({TransformableMarkdownRenderer} = require_from_app('renderers/transformable-markdown-renderer'));

timesRun = 0;

dummyAstWalker = function() {
  return {
    next: function() {
      if (timesRun === 0) {
        timesRun += 1;
        return {
          node: {
            type: 'paragraph'
          },
          entering: true
        };
      } else {
        return null;
      }
    }
  };
};

describe('TransformableMarkdownRenderer', function() {
  return it("runs the transformation when called", function() {
    var dummyTransformation, renderer, wasCalled;
    wasCalled = false;
    dummyTransformation = {
      paragraph: {
        enter: function() {
          return wasCalled = true;
        }
      }
    };
    renderer = new TransformableMarkdownRenderer([dummyTransformation]);
    renderer.render({
      walker: dummyAstWalker
    });
    return expect(wasCalled).to.equal(true);
  });
});
