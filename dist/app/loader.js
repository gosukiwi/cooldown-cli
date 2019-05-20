var GistService, GistStore, LocalStorage, NoSoftBreak, RemoteCodeBlocks, RequestService, TRANSFORMATIONS, TransformationNotFoundError, UTIL;

({TransformationNotFoundError} = require('./errors'));

({GistStore} = require("./stores/gist-store"));

({RequestService} = require("./services/request-service"));

({GistService} = require("./services/gist-service"));

({LocalStorage} = require("node-localstorage"));

({NoSoftBreak} = require('./transformations/no-soft-break'));

({RemoteCodeBlocks} = require('./transformations/remote-code-blocks'));

// TODO: See if there's a way transformations can register themselves
TRANSFORMATIONS = {
  NoSoftBreak: NoSoftBreak,
  RemoteCodeBlocks: RemoteCodeBlocks
};

UTIL = {
  GistStore: function(credentials) {
    var client, storage;
    client = new GistService(new RequestService(), credentials);
    storage = new LocalStorage("./.cooldown-cache");
    return new GistStore(client, storage);
  }
};

module.exports = function(name) {
  return TRANSFORMATIONS[name] || UTIL[name] || (function() {
    throw new TransformationNotFoundError(`[COOLFILE] Transformation with name \`${name}' was not found.`);
  })();
};
