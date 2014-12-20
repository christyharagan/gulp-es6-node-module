'use strict';

var through = require('through2');
var File = require('vinyl');

module.exports = function () {
  return through.obj(function (module, encoding, done) {
    var cjsString = module.toCJSString();

    this.push(new File({
      path: module.fullPath,
      contents: new Buffer(cjsString)
    }));

    done();
  });
};
