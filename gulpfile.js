/**
 * Requirements
 */
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish');

/**
 * Paths
 */
var paths = {
  scripts: ['gulpfile.js', 'client/**/*.js', '!client/lib/**/*.js', 'server/**/*.js'],
  clientTestScripts: ['client/components/**/*.spec.js'],
  serverTestScripts: ['server/api/**/*.spec.js']
};

/**
 * JavaScript linting
 */
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/**
 * Mocha client tests
 */
gulp.task('clientTests', function () {
  return gulp.src(paths.clientTestScripts, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

/**
 * Mocha server tests
 */
gulp.task('serverTests', function () {
  return gulp.src(paths.serverTestScripts, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

/**
 * Final tasks - these are the tasks that should be run from the command line,
 * as they encompass the above.
 */
gulp.task('test', ['lint', 'clientTests', 'serverTests']);