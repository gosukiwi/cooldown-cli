var MarkdownRenderer, commonmark;

commonmark = require('commonmark');

({MarkdownRenderer} = require_from_app('vendor/extensions/commonmark/markdown-renderer'));

describe('MarkdownRenderer', function() {
  it("parses strong", function() {
    var ast, parser, renderer;
    parser = new commonmark.Parser();
    ast = parser.parse("Hello **world**!");
    renderer = new MarkdownRenderer();
    return expect(renderer.render(ast)).to.equal("Hello **world**!\n\n");
  });
  return it("parses image", function() {
    var ast, parser, renderer;
    parser = new commonmark.Parser();
    ast = parser.parse("![my title](http://some.image)");
    renderer = new MarkdownRenderer();
    return expect(renderer.render(ast)).to.equal("![my title](http://some.image)\n\n");
  });
});
