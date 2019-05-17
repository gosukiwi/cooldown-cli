var CodeSnippetIntoGist, expect;

({expect} = require('chai'));

({CodeSnippetIntoGist} = require('../app/transformations/code-snippet-into-gist'));

describe('CodeSnippetIntoGist', function() {
  return it('says hi', function() {
    var transformation;
    transformation = new CodeSnippetIntoGist();
    return expect(transformation.transform("a = 1")).to.equal("some embed code");
  });
});
