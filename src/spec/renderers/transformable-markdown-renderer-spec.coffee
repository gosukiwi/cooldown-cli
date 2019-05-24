{ TransformableMarkdownRenderer } = require_from_app('renderers/transformable-markdown-renderer')

timesRun = 0
dummyAstWalker = ->
  next: ->
    if timesRun is 0
      timesRun += 1
      node:
        type: 'paragraph'
      entering: true
    else
      null

describe 'TransformableMarkdownRenderer', ->
  it "runs the transformation when called", ->
    wasCalled = no
    dummyTransformation =
      paragraph:
        enter: ->
          wasCalled = yes

    renderer = new TransformableMarkdownRenderer([dummyTransformation])
    renderer.render({ walker: dummyAstWalker })

    expect(wasCalled).to.equal(yes)
