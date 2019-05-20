var Gist, sha1;

sha1 = require('sha1');

Gist = class Gist {
  constructor(description, file, isPublic) {
    if (description === void 0) {
      throw new Error("Gist must have a description");
    }
    if (file === void 0) {
      throw new Error("Gist must have a file");
    }
    this.description = description;
    this.public = isPublic || false;
    this.file = file; // { name: "...", content: "..." }
    this.id = null;
    this.url = null;
  }

  static fromJSON(json) {
    var gist;
    json = JSON.parse(json);
    gist = new Gist(json.description, json.file, json.public);
    if (json.id) {
      gist.id = json.id;
    }
    if (json.url) {
      gist.url = json.url;
    }
    return gist;
  }

  toHash() {
    return {
      description: this.description,
      public: this.public,
      file: this.file,
      id: this.id,
      url: this.url
    };
  }

  toJSON() {
    return JSON.stringify(this.toHash());
  }

  cacheKey() {
    return sha1(JSON.stringify({
      description: this.description,
      public: this.public,
      file: this.file
    }));
  }

  embedCode() {
    if (this.url === null) {
      throw new Error("Gist must have an URL in order to be embedded");
    }
    return `<script src='${this.url}.js'></script>`;
  }

};

exports.Gist = Gist;
