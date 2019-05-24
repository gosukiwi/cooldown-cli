exports.GistService = class {
  constructor(http, credentials) {
    this.http = http;
    this.credentials = credentials;
  }

  create(params, callback) {
    return this.http.post("https://api.github.com/gists", this.credentials, params, callback);
  }

  delete(id, callback) {
    return this.http.delete(`https://api.github.com/gists/${id}`, this.credentials, callback);
  }

};
