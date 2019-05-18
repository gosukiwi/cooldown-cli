var expect;

({expect} = require('chai'));

global.expect = expect;

global.require_from_app = function(path) {
  return require(`../app/${path}`);
};
