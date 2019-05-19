var GistAPI, superagent;

superagent = require('superagent');

// Let's not create too many gists, they can flood the users' account with
// garbage.

// Let's make sure that we have some kind of control over the gists so we don't
// repeat them too much, and also delete/update when possible.

exports.GistStore = class {
  constructor(username) {
    this.api = new GistAPI(username);
  }

  create(options, callback) {
    return this.api.create(options, callback);
  }

};

GistAPI = class GistAPI {
  constructor(username) {
    this.username = username;
    this.token = process.env.GITHUB_TOKEN;
  }

  create(params, callback) {
    return superagent.post("https://api.github.com/gists").set("User-Agent", "request").auth(this.username, this.token).send(params).end(function(err, res) {
      return callback(err, res);
    });
  }

};
