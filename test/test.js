'use strict';

var chai = require('chai');
chai.use(chai.should);

var fs = require('fs');
var nodePackage = require('../lib/nodePackage');
var getDependencies = require('../lib/getDependencies');
var toCJS = require('../lib/toCJS');
var through2 = require('through2');
var File = require('vinyl');

var packageDir = __dirname + '/projects/es6B/';

var mainJS = packageDir + 'lib/main.js';
var utilJS = packageDir + 'lib/sub/util.js';
var fooJS = packageDir + 'node_modules/es6A/lib/foo.js';

describe('module', function () {
  it('should compile the module to es5 code', function () {
    var files = {};

    return fs.createReadStream(mainJS)
      .pipe(through2.obj(function (code, enc, done) {
        this.push(new File({
          path: mainJS,
          contents: code
        }));
        done();
      }))
      .pipe(nodePackage({
        packageDir: packageDir
      }))
      .pipe(getDependencies({
        includeSeed: true
      }))
      .pipe(toCJS())
      .on('data', function (file) {
        files[file.path] = file;
      })
      .on('end', function () {
        files.should.have.keys(mainJS, utilJS, fooJS);
        files[mainJS].contents.toString().should.equal('"use strict";\nvar lib$sub$util$$ = require("./sub/util");\n\'use strict\';\n\nvar monkey = require(\'cjsB/lib/monkey\');\n\nmonkey();');
        files[utilJS].contents.toString().should.equal('"use strict";\nvar node_modules$es6A$lib$foo$$ = require("es6A/lib/foo");\n\'use strict\';\n\nnode_modules$es6A$lib$foo$$.default();');
        files[fooJS].contents.toString().should.equal('"use strict";\n\'use strict\';\n\nexports["default"] = function() {\r\n  return \'hello\';\r\n};');
      });
  });
});
