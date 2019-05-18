{ MarkdownRenderer } = require_from_app('vendor/extensions/commonmark/markdown-renderer')
{ RendererWithTransformations } = require_from_app('renderer-with-transformations')
{ NoSoftBreak } = require_from_app('transformations/no-soft-break')
commonmark = require('commonmark')

describe 'Transformations/NoSoftBreak', ->
  it "transforms single new lines into spaces", ->
    given = """
    This is
    a sentence.
    """
    transformations = [ NoSoftBreak ]
    renderer = new RendererWithTransformations(new MarkdownRenderer(), transformations)
    parser   = new commonmark.Parser()
    ast      = parser.parse(given)

    expect(renderer.render(ast)).to.equal("This is a sentence.\n\n")
