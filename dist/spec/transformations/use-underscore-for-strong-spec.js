var Compiler, UseUnderscoreForStrong;

({Compiler} = require_from_app('compiler'));

({UseUnderscoreForStrong} = require_from_app('transformations/use-underscore-for-strong'));

describe('Transformations/UseUnderscoreForStrong', function() {
  return it("uses underscore for strong", function(done) {
    var compiler, transformations;
    transformations = [UseUnderscoreForStrong];
    compiler = new Compiler(transformations);
    return compiler.compile("**foo**", function(result) {
      expect(result).to.equal("__foo__");
      return done();
    });
  });
});
