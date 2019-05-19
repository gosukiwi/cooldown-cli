// { LocalStorage } = require('node-localstorage')
// new LocalStorage('./cooldown')

// Let's not create too many gists, they can flood the users' account with
// garbage.

// Let's make sure that we have some kind of control over the gists so we don't
// repeat them too much, and also delete/update when possible.

exports.GistsStore = class {
  constructor(client, storage) {
    this.client = client;
    this.storage = storage;
  }

  create(gist, callback) {
    var cached, key;
    key = gist.cacheKey();
    cached = this.storage.getItem(key);
    if (cached) {
      if (typeof callback === "function") {
        callback(cached);
      }
      return this;
    }
    this.client.create(gist.toHash(), (err, res) => {
      var response;
      if (err) {
        throw new Error("Invalid request");
      }
      response = res.body;
      gist.id = response.id;
      gist.url = response.html_url;
      this.storage.setItem(key, gist);
      return typeof callback === "function" ? callback(gist) : void 0;
    });
    return this;
  }

};
