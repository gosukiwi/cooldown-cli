var GistSnippets, MarkdownRenderer, RendererWithTransformations, commonmark;

({MarkdownRenderer} = require_from_app('renderers/markdown-renderer'));

({RendererWithTransformations} = require_from_app('renderers/renderer-with-transformations'));

({GistSnippets} = require_from_app('transformations/gist-snippets'));

commonmark = require('commonmark');

describe('Transformations/GistSnippets', function() {
  return it("creates a gist from a `code_block`", function() {
    var ast, dummyStore, given, parser, renderer;
    dummyStore = {
      create: function(gist, callback) {
        gist.url = "http://some-fake.url";
        callback(gist);
        return this;
      }
    };
    given = "```ruby\nthis_is = \"some ruby code!\"\n```";
    renderer = new RendererWithTransformations(new MarkdownRenderer(), [GistSnippets(dummyStore)]);
    parser = new commonmark.Parser();
    ast = parser.parse(given);
    return expect(renderer.render(ast)).to.equal("<script src='http://some-fake.url.js'></script>\n");
  });
});
