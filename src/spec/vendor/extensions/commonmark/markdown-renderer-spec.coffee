commonmark = require('commonmark')
{ MarkdownRenderer } = require_from_app('vendor/extensions/commonmark/markdown-renderer')

describe 'MarkdownRenderer', ->
  it "parses strong", ->
    parser   = new commonmark.Parser()
    ast      = parser.parse("Hello **world**!")
    renderer = new MarkdownRenderer()
    expect(renderer.render(ast)).to.equal("Hello **world**!\n\n")

  it "parses image", ->
    parser   = new commonmark.Parser()
    ast      = parser.parse("![my title](http://some.image)")
    renderer = new MarkdownRenderer()
    expect(renderer.render(ast)).to.equal("![my title](http://some.image)\n\n")
