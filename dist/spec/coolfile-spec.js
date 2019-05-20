var TRANSFORMATIONS, coolfile, fixture, fs;

fs = require('fs');

({coolfile} = require_from_app('coolfile'));

fixture = function(name) {
  return fs.readFileSync(`${process.cwd()}\\src\\spec\\fixtures\\${name}`, "utf8");
};

TRANSFORMATIONS = {
  NoSoftBreak: 'no-soft-break',
  RemoteCodeBlocks: function(p) {
    return p;
  },
  GistStore: function() {
    return 'a-fake-store';
  }
};

describe('Coolfile', function() {
  return it('defines the transformations', function() {
    var file, loader, transformations;
    loader = function(name) {
      return TRANSFORMATIONS[name] || (function() {
        throw new Error(`Cannot find transformation ${name}`);
      })();
    };
    file = fixture("coolfile.js");
    transformations = eval(file)(loader);
    expect(transformations[0]).to.eql('no-soft-break');
    return expect(transformations[1]).to.eql('a-fake-store');
  });
});
