var GistSnippets, NoSoftBreak, TRANSFORMATIONS, TransformationNotFoundError, fs, transformations;

({NoSoftBreak} = require('./transformations/no-soft-break'));

({GistSnippets} = require('./transformations/gist-snippets'));

({TransformationNotFoundError} = require('./error-codes'));

fs = require('fs');

TRANSFORMATIONS = {
  NoSoftBreak: NoSoftBreak,
  GistSnippets: GistSnippets
};

transformations = function(name) {
  return TRANSFORMATIONS[name] || (function() {
    throw new TransformationNotFoundError(`[COOLFILE] Transformation with name \`${name}' was not found.`);
  })();
};

module.exports = function(path) {
  var coolfile;
  coolfile = fs.readFileSync(path, "utf-8");
  return eval(coolfile)(transformations);
};
