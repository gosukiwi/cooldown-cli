var Gist, async;

({Gist} = require('../models/gist'));

async = require('async');

// Let's not create too many gists, they can flood the users' account with
// garbage.

// Let's make sure that we have some kind of control over the gists so we don't
// repeat them too much, and also delete/update when possible.

exports.GistStore = class {
  constructor(client, storage) {
    this.client = client;
    this.storage = storage;
    this.activeGists = [];
  }

  create(gist, done) {
    var cached, key;
    key = gist.cacheKey();
    cached = this.storage.getItem(key);
    if (cached) {
      gist = Gist.fromJSON(cached);
      this.activeGists.push(key);
      done(gist);
      return;
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
      this.activeGists.push(gist.cacheKey());
      return done(gist);
    });
  }

  prune(done) {
    var all, i;
    all = (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = this.storage.length - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
        results.push(this.storage.getItem(this.storage.key(i)));
      }
      return results;
    }).call(this);
    return async.each(all, (val, callback) => {
      var gist;
      gist = Gist.fromJSON(val);
      if (this.isActive(gist)) {
        return callback(); // do nothing
      } else {
        return this.destroy(gist, callback);
      }
    }, function(err, _result) {
      if (err) {
        throw err;
      }
      return done();
    });
  }

  // private
  destroy(gist, done) {
    return this.client.delete(gist.id, (err, res) => {
      this.storage.removeItem(gist.cacheKey());
      return done();
    });
  }

  isActive(gist) {
    return this.activeGists.indexOf(gist.cacheKey()) >= 0;
  }

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
