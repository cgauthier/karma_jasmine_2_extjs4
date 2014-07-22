module.exports = function(config) {
    config.set({
        // basePath is used to resolve all patterns of files
        basePath: 'c:/xampp/htdocs/karma_jasmine_2_extjs4',
        // frameworks to select which unit testing framework you will be using
        frameworks: ["jasmine"],
        // for extjs this is tricky as you will need the following files
        // 1 extjs framework
        // 2 extjs ready/karma launch
        // 3 extjs loader.setPath file
        // 4 files to be tests
        // 5 files which need to be served for ajax calls, etc.
        // 6 unit test files        
        files: [
            //"http://localhost/ext-4.2.2-ent/ext-4.2.2.1144/ext-all.js", // 1
            "http://localhost/extjs421/ext-all.js", // 1
            "karma_app_test.js", // 2
            "karma_extjs_appconfig.js", // 3
            
            "app/model/User.js",
            "app/view/user/Edit.js",
            "app/view/user/List.js",
            { pattern: 'data/users.json', watched: false, included: false, served: true}, // this file will be served when our ajax calls requires it
            "app/store/Users.js",
            "app/controller/Users.js",

            "app-tests/example.js" // you can add as many test files as required.
        ],
        // reporters are different ways to display your reports and/or types of reports
        reporters: ["dots", "progress", "coverage", "html"],
        // Karma's default port is 9876
        port: 9876,
        // your coverage reporter, needs a type and a location to be displayed.
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        // you can associate various types of services and reports to file.
        // in our case, we are associating coverage with files for analysing the amount of function coverage each file is getting from the tests.
        preprocessors: {
            'app/store/Users.js': 'coverage',
            'app/controller/Users.js': 'coverage'
        },
        // setting up the output directory of html Reporter which will reporter the Jasmine unit tests info (what passes and fails)
        htmlReporter: {
            outputDir: 'karma_dir'
        },
        colors: true,
        // when files are served, this proxy will be used to resolved paths, for example in our store's proxy
        proxies: {
            "data/": "http://localhost:9876/base/data"
        },
        // log level allows you to view output of karma's execution
        // possible values are: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,
        // enable or disable watching files when they change
        autoWatch: false,
        // which browsers to use
        // browsers: ["Chrome"],
        browsers: ["PhantomJS"],
        // if true, karma captures browsers, runs the tests and then exits
        // if debugging, use a browser like Chrome, Firefox, etc. and set singleRun: false
        singleRun: true,
        // this might be a bug in Karma, because base/ is supposed to be set by default, but somehow, it seems to be required here
        // for Karma to properly find the files.  You can read about this online on various sites.
        urlRoot: '/base/'
    });
};
