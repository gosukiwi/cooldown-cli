var superagent;

superagent = require('superagent');

exports.HTTPRequestService = class {
  post(url, credentials, params, callback) {
    return superagent.post(url).set("User-Agent", "request").auth(credentials.username, credentials.password).send(params).end(callback); // callback is called with (err, res)
  }

  delete(url, credentials, callback) {
    return superagent.del(url).set("User-Agent", "request").auth(credentials.username, credentials.password).end(callback); // callback is called with (err, res)
  }

};
