{ RendererWithTransformations } = require_from_app('renderer-with-transformations')

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

describe 'RendererWithTransformations', ->
  it "runs the transformation when called", ->
    wasCalled = no
    dummyTransformation =
      paragraph:
        enter: ->
          wasCalled = yes

    renderer = new RendererWithTransformations({}, [dummyTransformation])
    renderer.render({ walker: dummyAstWalker })

    expect(wasCalled).to.equal(yes)
