'use strict';

var through = require('through2');
var getDependencies = require('es6-node-module/lib/getDependencies');

module.exports = function (opts) {
  opts = opts || {};
  var allModules = [];
  var modules = [];

  var addModule = function (module, encoding, done) {
    modules.push(module);

    done();
  };

  var doGetDependencies = function (done) {
    getDependencies(opts.includeSeed, opts.shallow, modules)
      .forEach(function (dependency) {
        allModules.push(dependency);
      });

    allModules.forEach(this.push.bind(this));

    done();
  };

  return through.obj(addModule, doGetDependencies);
};
