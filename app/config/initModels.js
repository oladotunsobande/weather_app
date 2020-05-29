const appRoot = require('app-root-path');
const glob = require('glob');

var modelsPath = `${appRoot.path}/src/modules/**/*.do.js`;

let models = glob.sync(modelsPath);
models.forEach(function(model) {
  module.require(model);
});
