{ TransformationNotFoundError } = require('./errors')
{ GistStore } = require("./stores/gist-store")
{ RequestService } = require("./services/request-service")
{ GistService } = require("./services/gist-service")
{ LocalStorage } = require("node-localstorage")
{ NoSoftBreak } = require('./transformations/no-soft-break')
{ RemoteCodeBlocks } = require('./transformations/remote-code-blocks')

# TODO: See if there's a way transformations can register themselves
TRANSFORMATIONS =
  NoSoftBreak: NoSoftBreak
  RemoteCodeBlocks: RemoteCodeBlocks

UTIL =
  GistStore: (credentials) ->
    client  = new GistService(new RequestService(), credentials)
    storage = new LocalStorage("./.cooldown-cache")
    new GistStore(client, storage)

module.exports = (name) ->
  TRANSFORMATIONS[name] or UTIL[name] or throw new TransformationNotFoundError("[COOLFILE] Transformation with name `#{name}' was not found.")
