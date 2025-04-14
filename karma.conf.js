// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '', // Base path for resolving files, set to empty to consider the current directory
    frameworks: ['jasmine', '@angular-devkit/build-angular'], // Define the testing framework (Jasmine) and Angular-specific build plugins
    plugins: [
      require('karma-jasmine'), // Plugin for running Jasmine tests
      require('karma-chrome-launcher'), // Plugin for launching Chrome browser to run the tests
      require('karma-jasmine-html-reporter'), // Plugin for displaying test results in HTML format
      require('karma-coverage'), // Plugin for generating code coverage reports
      require('@angular-devkit/build-angular/plugins/karma') // Plugin for Angular-specific build setup with Karma
    ],
    client: {
      jasmine: {
        // Configuration options for Jasmine tests can be added here, such as disabling random execution or setting a specific seed
      },
      clearContext: false // Ensures Jasmine Spec Runner output remains visible in the browser during tests
    },
    jasmineHtmlReporter: {
      suppressAll: true // Removes duplicated trace output in the HTML reporter
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-15-example'), // Directory for storing coverage reports
      subdir: '.', // Subdirectory for coverage files, set to current directory
      reporters: [
        { type: 'html' }, // Generate an HTML coverage report
        { type: 'text-summary' } // Generate a summary of code coverage in the terminal
      ]
    },
    reporters: ['progress', 'kjhtml'], // Define the reporters used for test output (progress in terminal, HTML in the browser)
    port: 9876, // Port where Karma web server will listen for browser connections
    colors: true, // Enable colors in the terminal output
    logLevel: config.LOG_INFO, // Set the log level for Karma (info level)
    autoWatch: true, // Enable automatic re-running of tests when files change
    browsers: ['Chrome'], // Define the browser(s) to run the tests in (Chrome in this case)
    singleRun: false, // Keeps Karma running for continuous testing (set to true for a single run)
    restartOnFileChange: true // Automatically restart tests when files are changed
  });
};

