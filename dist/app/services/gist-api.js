var superagent;

superagent = require('superagent');

exports.GistAPI = class {
  constructor(credentials) {
    this.credentials = credentials;
  }

  create(params, callback) {
    return superagent.post("https://api.github.com/gists").set("User-Agent", "request").auth(this.credentials.username, this.credentials.password).send(params).end(function(err, res) {
      return callback(err, res);
    });
  }

};
