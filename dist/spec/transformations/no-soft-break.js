var Compiler, NoSoftBreak;

({Compiler} = require_from_app('compiler'));

({NoSoftBreak} = require_from_app('transformations/no-soft-break'));

describe('Transformations/NoSoftBreak', function() {
  return it("transforms single new lines into spaces", function(done) {
    var compiler, given, transformations;
    given = "This is\na sentence.";
    transformations = [NoSoftBreak];
    compiler = new Compiler(transformations);
    return compiler.compile(given, function(result) {
      expect(result).to.equal("This is a sentence.\n\n");
      return done();
    });
  });
});
