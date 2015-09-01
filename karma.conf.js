// Karma configuration
// Generated on Sat Aug 29 2015 17:00:52 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'client/lib/underscore/underscore-min.js',
      'client/lib/angular/angular.min.js',
      'client/lib/angular-ui-router/release/angular-ui-router.min.js',
      'client/lib/angular-mocks/angular-mocks.js',
      'client/app.js',
      'client/components/**/*.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
    },

    // test results reporter to use
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    singleRun: true
    
  })
}
