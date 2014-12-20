'use strict';

var gulp = require('gulp');
var nodePackage = require('../../../lib/nodePackage');
var getDependencies = require('../../../lib/getDependencies');
var toCJS = require('../../../lib/toCJS');

gulp.task('es5', function () {
  return gulp.src('./lib/main.js')
    .pipe(nodePackage())
    .pipe(getDependencies({
      includeSeed: true
    }))
    .pipe(toCJS())
    .pipe(gulp.dest('./dist/'));
});
