{ expect } = require('chai')
{ RendererObserver } = require_from_app('renderer-observer')

dummyRenderer =
  paragraph: ->
    # NOOP

describe 'RendererObserver', ->
  it "adds `entered` hook", ->
    touch = no
    renderer = new RendererObserver(dummyRenderer)
    renderer.on 'entered', ->
      touch = yes

    renderer.paragraph(null, true)
    expect(touch).to.equal(true)

  it "adds `left` hook", ->
    touch = no
    renderer = new RendererObserver(dummyRenderer)
    renderer.on 'left', ->
      touch = yes

    renderer.paragraph(null, false)
    expect(touch).to.equal(true)
