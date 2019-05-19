var MarkdownRenderer, NoSoftBreak, RendererWithTransformations, commonmark;

({MarkdownRenderer} = require_from_app('renderers/markdown-renderer'));

({RendererWithTransformations} = require_from_app('renderers/renderer-with-transformations'));

({NoSoftBreak} = require_from_app('transformations/no-soft-break'));

commonmark = require('commonmark');

describe('Transformations/NoSoftBreak', function() {
  return it("transforms single new lines into spaces", function() {
    var ast, given, parser, renderer, transformations;
    given = "This is\na sentence.";
    transformations = [NoSoftBreak];
    renderer = new RendererWithTransformations(new MarkdownRenderer(), transformations);
    parser = new commonmark.Parser();
    ast = parser.parse(given);
    return expect(renderer.render(ast)).to.equal("This is a sentence.\n\n");
  });
});
