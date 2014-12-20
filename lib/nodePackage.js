'use strict';

var through = require('through2');
var Path = require('path');
var VinylResolver = require('./vinylResolver');
var NodePackage = require('es6-node-module/lib/nodePackage');

module.exports = function (opts) {
  opts = opts || {};
  var packageDir = opts.packageDir;
  if (!packageDir) {
    packageDir = process.cwd();
  }

  var vinylResolver = new VinylResolver({baseDir: packageDir});
  var nodePackage = new NodePackage(packageDir, vinylResolver);

  var files = [];

  return through.obj(function (file, encoding, done) {
    vinylResolver.addFile(file);
    files.push(file);
    done();
  }, function (done) {
    var self = this;
    files.forEach(function(file){
      var module = nodePackage.getModule('./' + Path.relative(packageDir, file.path));
      if (module) {
        self.push(module);
      } else {
        // TODO Log warning
      }
    });
    done();
  });
};
