'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var paths = {
  scripts: '*.js',
  tests: 'test/*.js'
};

gulp.task('test', function () {
  process.env.NODE_ENV = 'test';

  return gulp.src(paths.tests)
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('lint', function() {
  return gulp.src([paths.scripts, paths.tests])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
  gulp.watch([paths.scripts, paths.tests], ['lint', 'test']);
});

gulp.task('default', ['lint', 'test']);
