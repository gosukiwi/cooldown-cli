var coolfile, fixture, fs;

fs = require('fs');

({coolfile} = require_from_app('coolfile'));

fixture = function(name) {
  return fs.readFileSync(`${process.cwd()}\\src\\spec\\fixtures\\${name}`, "utf-8");
};

describe('Coolfile', function() {
  return it('defines the transformations', function() {
    var file, transformations;
    file = fixture("coolfile.js");
    transformations = eval(file)();
    return expect(transformations).to.eql([1, 2, 3]);
  });
});
