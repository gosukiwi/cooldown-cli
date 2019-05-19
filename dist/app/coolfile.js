var GistSnippets, NoSoftBreak, TRANSFORMATIONS, fs, transformations;

({NoSoftBreak} = require('./transformations/no-soft-break'));

({GistSnippets} = require('./transformations/gist-snippets'));

fs = require('fs');

TRANSFORMATIONS = {
  NoSoftBreak: NoSoftBreak,
  GistSnippets: GistSnippets
};

transformations = function(name) {
  return TRANSFORMATIONS[name] || (function() {
    throw new Error("Invalid Transformation");
  })();
};

module.exports = function(path) {
  var coolfile;
  coolfile = fs.readFileSync(path, "utf-8");
  return eval(coolfile)(transformations);
};
