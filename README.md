Gulp ES6 Node Module
=======

Overview
------

A gulp wrapper for the es6-node-module library, intended to support es6-es5 builds.

Usage
------

Install:

```
npm install gulp-es6-node-module
```

Basic usage:

```javascript
gulp.task('compileES5', function(){
  return gulp.src('lib/**/*.js')
    .pipe(nodePackage())
    .pipe(getDependencies({
      includeSeed: true
    }))
    .pipe(toCJS())
    .pipe(gulp.dest('dist/es5'));
});
```

Other options for the ```getDependencies``` function include ```shallow``` (defaults to ```false```) which specifies whether to perform
shallow dependency resolution or deep/recursive (default).

The ```nodePackage``` function has a single option ```packageDir``` (defaults to ```process.cwd()```).
