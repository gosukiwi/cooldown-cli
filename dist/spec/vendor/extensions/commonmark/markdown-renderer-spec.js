var MarkdownRenderer, commonmark, compile, parser, renderer;

commonmark = require('commonmark');

({MarkdownRenderer} = require_from_app('vendor/extensions/commonmark/markdown-renderer'));

parser = new commonmark.Parser();

renderer = new MarkdownRenderer();

compile = function(input, callback) {
  var ast;
  ast = parser.parse(input);
  return callback(renderer.render(ast));
};

describe('MarkdownRenderer', function() {
  it("parses emphasis", function() {
    return compile('Hello _world_!', function(compiled) {
      return expect(compiled).to.equal("Hello _world_!\n\n");
    });
  });
  it("parses strong", function() {
    return compile('Hello **world**!', function(compiled) {
      return expect(compiled).to.equal("Hello **world**!\n\n");
    });
  });
  it("parses image", function() {
    return compile('![my title](http://some.image)', function(compiled) {
      return expect(compiled).to.equal("![my title](http://some.image)\n\n");
    });
  });
  it("parses paragraph", function() {
    var text;
    text = "A paragraph with a long sentence which is\nbroken in two lines.";
    return compile(text, function(compiled) {
      return expect(compiled).to.equal("A paragraph with a long sentence which is\nbroken in two lines.\n\n");
    });
  });
  it("parses link", function() {
    return compile("[some link](http://some.website)", function(compiled) {
      return expect(compiled).to.equal("[some link](http://some.website)\n\n");
    });
  });
  it("parses code", function() {
    return compile("this is `code`", function(compiled) {
      return expect(compiled).to.equal("this is `code`\n\n");
    });
  });
  return it("parses heading", function() {
    return compile("### Level 3 heading", function(compiled) {
      return expect(compiled).to.equal("### Level 3 heading");
    });
  });
});
