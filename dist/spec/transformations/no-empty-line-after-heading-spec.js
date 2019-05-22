var Compiler, NoEmptyLineAfterHeading;

({Compiler} = require_from_app('compiler'));

({NoEmptyLineAfterHeading} = require_from_app('transformations/no-empty-line-after-heading'));

describe('Transformations/NoEmptyLineAfterHeading', function() {
  return it("doesn't write an empty line after the heading", function(done) {
    var compiler, expected, given, transformations;
    given = "# This is a heading\n\nAnd it has an empty new line afterwards.";
    expected = "# This is a heading\nAnd it has an empty new line afterwards.";
    transformations = [NoEmptyLineAfterHeading];
    compiler = new Compiler(transformations);
    return compiler.compile(given, function(result) {
      expect(result).to.equal(expected);
      return done();
    });
  });
});
