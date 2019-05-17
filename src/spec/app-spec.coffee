{ expect } = require('chai')
{ CodeSnippetIntoGist } = require('../app/transformations/code-snippet-into-gist')

describe 'CodeSnippetIntoGist', ->
  it 'says hi', ->
    transformation = new CodeSnippetIntoGist()
    expect(transformation.transform("a = 1")).to.equal("some embed code")
