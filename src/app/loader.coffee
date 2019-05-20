{ TransformationNotFoundError } = require('./error-codes')
{ NoSoftBreak } = require('./transformations/no-soft-break')
{ GistSnippets } = require('./transformations/gist-snippets')
{ GistsStore } = require("./stores/gists-store")
{ Request } = require("./services/request")
{ GistAPI } = require("./services/gist-api")
{ LocalStorage } = require("node-localstorage")

# TODO: See if there's a way transformations can register themselves
TRANSFORMATIONS =
  NoSoftBreak: NoSoftBreak
  GistSnippets: GistSnippets

UTIL =
  GistsStore: (credentials) ->
    client  = new GistAPI(new Request(), credentials)
    storage = new LocalStorage("./.cooldown-cache")
    new GistsStore(client, storage)

module.exports = (name) ->
  TRANSFORMATIONS[name] or UTIL[name] or throw new TransformationNotFoundError("[COOLFILE] Transformation with name `#{name}' was not found.")
