var MarkdownRenderer, NoSoftBreak, RendererWithTransformations, commonmark, expect;

({expect} = require('chai'));

({MarkdownRenderer} = require_from_app('vendor/extensions/commonmark/markdown-renderer'));

({RendererWithTransformations} = require_from_app('renderer-with-transformations'));

({NoSoftBreak} = require_from_app('transformations/no-soft-break'));

commonmark = require('commonmark');

describe('RendererWithTransformations', function() {
  return it("transforms `NoSoftBreak`", function() {
    var ast, given, parser, renderer, transformations;
    given = "This is\na sentence.";
    transformations = [NoSoftBreak];
    renderer = new RendererWithTransformations(new MarkdownRenderer(), transformations);
    parser = new commonmark.Parser();
    ast = parser.parse(given);
    return expect(renderer.render(ast)).to.equal("This is a sentence.\n\n");
  });
});
