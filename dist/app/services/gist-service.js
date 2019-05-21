exports.GistService = class {
  constructor(request, credentials) {
    this.request = request;
    this.credentials = credentials;
  }

  create(params, callback) {
    return this.request.post("https://api.github.com/gists", this.credentials, params, callback);
  }

  delete(id, callback) {
    return this.request.delete(`https://api.github.com/gists/${id}`, this.credentials, callback);
  }

};
