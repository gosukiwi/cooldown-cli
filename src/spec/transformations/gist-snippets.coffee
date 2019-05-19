{ MarkdownRenderer } = require_from_app('renderers/markdown-renderer')
{ RendererWithTransformations } = require_from_app('renderers/renderer-with-transformations')
{ GistSnippets } = require_from_app('transformations/gist-snippets')
commonmark = require('commonmark')

describe 'Transformations/GistSnippets', ->
  it "creates a gist from a `code_block`", ->
    dummyStore =
      create: (gist, callback) ->
        gist.url = "http://some-fake.url"
        callback(gist)
        this
    given = """
    ```ruby
    this_is = "some ruby code!"
    ```
    """
    renderer = new RendererWithTransformations(new MarkdownRenderer(), [GistSnippets(dummyStore)])
    parser   = new commonmark.Parser()
    ast      = parser.parse(given)

    expect(renderer.render(ast)).to.equal("<script src='http://some-fake.url.js'></script>\n")
