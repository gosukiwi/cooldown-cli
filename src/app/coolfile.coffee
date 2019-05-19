{ NoSoftBreak } = require('./transformations/no-soft-break')
{ GistSnippets } = require('./transformations/gist-snippets')
fs = require('fs')

TRANSFORMATIONS =
  NoSoftBreak: NoSoftBreak
  GistSnippets: GistSnippets

transformations = (name) ->
  TRANSFORMATIONS[name] or throw new Error("Invalid Transformation")

module.exports = (path) ->
  coolfile = fs.readFileSync(path, "utf-8")
  eval(coolfile)(transformations)
