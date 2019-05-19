{ MarkdownRenderer } = require_from_app('vendor/extensions/commonmark/markdown-renderer')
{ RendererWithTransformations } = require_from_app('renderer-with-transformations')
{ GistSnippets } = require_from_app('transformations/gist-snippets')
commonmark = require('commonmark')

describe 'Transformations/GistSnippets', ->
  it "creates a gist from a `code_block`", ->
    given = """
    ```ruby
    this_is = "some ruby code!"
    ```
    """
    renderer = new RendererWithTransformations(new MarkdownRenderer(), [GistSnippets])
    parser   = new commonmark.Parser()
    ast      = parser.parse(given)

    # TODO: Test actual script URL eventually
    expect(renderer.render(ast)).to.equal("")
