var GistSnippets, MarkdownRenderer, RendererWithTransformations, commonmark;

({MarkdownRenderer} = require_from_app('vendor/extensions/commonmark/markdown-renderer'));

({RendererWithTransformations} = require_from_app('renderer-with-transformations'));

({GistSnippets} = require_from_app('transformations/gist-snippets'));

commonmark = require('commonmark');

describe('Transformations/GistSnippets', function() {
  return it("creates a gist from a `code_block`", function() {
    var ast, given, parser, renderer;
    given = "```ruby\nthis_is = \"some ruby code!\"\n```";
    renderer = new RendererWithTransformations(new MarkdownRenderer(), [GistSnippets]);
    parser = new commonmark.Parser();
    ast = parser.parse(given);
    // TODO: Test actual script URL eventually
    return expect(renderer.render(ast)).to.equal("");
  });
});
