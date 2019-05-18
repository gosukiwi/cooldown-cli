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
      return expect(compiled).to.equal(`${text}\n\n`);
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
  it("parses heading", function() {
    return compile("### Level 3 heading", function(compiled) {
      return expect(compiled).to.equal("### Level 3 heading");
    });
  });
  it("parses HTML inline", function() {
    return compile("<strong>some html</strong>", function(compiled) {
      return expect(compiled).to.equal("<strong>some html</strong>\n\n");
    });
  });
  it("parses thematic break", function() {
    var text;
    text = "some text\n\n---\n\nmore text";
    return compile(text, function(compiled) {
      return expect(compiled).to.equal(`${text}\n\n`);
    });
  });
  it("parses blockquote", function() {
    var text;
    text = "> This is a blockquote\nand it's broken into two lines.";
    return compile(text, function(compiled) {
      return expect(compiled).to.equal(`${text}\n\n`);
    });
  });
  describe('codeblock', function() {
    it("parses with a language", function() {
      var text;
      text = "```ruby\na = 1\n```";
      return compile(text, function(compiled) {
        return expect(compiled).to.equal(`${text}\n\n`);
      });
    });
    return it("parses without a language", function() {
      var text;
      text = "```\na = 1\n```";
      return compile(text, function(compiled) {
        return expect(compiled).to.equal(`${text}\n\n`);
      });
    });
  });
  return describe('lists', function() {
    it('parses bulleted lists', function() {
      var text;
      text = "* one\n* two\n* three";
      return compile(text, function(compiled) {
        return expect(compiled).to.equal(`${text}\n\n`);
      });
    });
    it('parses numbered lists', function() {
      var text;
      text = "1. one\n1. two\n1. three";
      return compile(text, function(compiled) {
        return expect(compiled).to.equal(`${text}\n\n`);
      });
    });
    return it('always uses `1.` on numbered lists', function() {
      var expected, given;
      given = "1. one\n2. two\n3. three";
      expected = "1. one\n1. two\n1. three\n\n";
      return compile(given, function(compiled) {
        return expect(compiled).to.equal(expected);
      });
    });
  });
});
