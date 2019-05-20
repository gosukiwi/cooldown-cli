{ NoSoftBreak } = require('./transformations/no-soft-break')
{ GistSnippets } = require('./transformations/gist-snippets')
{ TransformationNotFoundError } = require('./error-codes')
fs = require('fs')

TRANSFORMATIONS =
  NoSoftBreak: NoSoftBreak
  GistSnippets: GistSnippets

transformations = (name) ->
  TRANSFORMATIONS[name] or throw new TransformationNotFoundError("[COOLFILE] Transformation with name `#{name}' was not found.")

module.exports = (path) ->
  coolfile = fs.readFileSync(path, "utf-8")
  eval(coolfile)(transformations)
