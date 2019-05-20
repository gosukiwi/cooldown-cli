var Gist;

({Gist} = require('../models/gist'));

// Let's not create too many gists, they can flood the users' account with
// garbage.

// Let's make sure that we have some kind of control over the gists so we don't
// repeat them too much, and also delete/update when possible.

exports.GistsStore = class {
  constructor(client, storage) {
    this.client = client;
    this.storage = storage;
  }

  create(gist, done) {
    var cached, key;
    key = gist.cacheKey();
    cached = this.storage.getItem(key);
    if (cached) {
      return done(Gist.fromJSON(cached));
    }
    return this.client.create(this.options(gist), (err, res) => {
      var response;
      if (err) {
        throw err;
      }
      response = res.body;
      gist.id = response.id;
      gist.url = response.html_url;
      this.storage.setItem(key, gist.toJSON());
      return done(gist);
    });
  }

  // private
  options(gist) {
    return {
      description: gist.description,
      public: gist.public,
      files: {
        [`${gist.file.name}`]: {
          content: gist.file.content
        }
      }
    };
  }

};
