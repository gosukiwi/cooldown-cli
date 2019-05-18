var RendererObserver, dummyRenderer, expect;

({expect} = require('chai'));

({RendererObserver} = require_from_app('renderer-observer'));

dummyRenderer = {
  paragraph: function() {}
};

// NOOP
describe('RendererObserver', function() {
  it("adds `entered` hook", function() {
    var renderer, touch;
    touch = false;
    renderer = new RendererObserver(dummyRenderer);
    renderer.on('entered', function() {
      return touch = true;
    });
    renderer.paragraph(null, true);
    return expect(touch).to.equal(true);
  });
  return it("adds `left` hook", function() {
    var renderer, touch;
    touch = false;
    renderer = new RendererObserver(dummyRenderer);
    renderer.on('left', function() {
      return touch = true;
    });
    renderer.paragraph(null, false);
    return expect(touch).to.equal(true);
  });
});
