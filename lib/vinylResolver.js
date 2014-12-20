'use strict';

var Path = require('path');
var transpiler = require('es6-node-module/node_modules/es6-module-transpiler/lib/index');

var VinylResolver = function (opts) {
  this.files = {};
  this.baseDir = opts ? opts.baseDir : null;
};

VinylResolver.prototype.resolveModule = function (importedPath, fromModule, container) {
  var path;
  if (importedPath[0] === '.' && fromModule) {
    path = Path.dirname(fromModule.path);
    path = Path.join(path, importedPath);
  } else if (!fromModule) {
    path = Path.join(this.baseDir, importedPath);
  } else {
    return null;
  }

  if (path.slice(-3).toLowerCase() !== '.js') {
    path += '.js';
  }

  var cachedModule = container.getCachedModule(path);
  if (cachedModule) {
    return cachedModule;
  }

  var file = this.files[path];

  if (file) {
    var module = new transpiler.Module(path, importedPath, container);
    module.name = Path.relative(this.baseDir || file.base, file.path).replace(/\.js$/, '');
    module.src = file.contents.toString();
    return module;
  } else {
    return null;
  }
};

VinylResolver.prototype.addFile = function(file) {
  this.files[file.path] = file;
};

module.exports = VinylResolver;
