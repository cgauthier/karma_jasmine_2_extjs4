Testing ExtJS 4.x applications using Karma and Jasmine 2.x
----------------------------------------------------------

Running Jasmine 2.x Unit Tests for ExtJS 4.x apps using Karma runner and dealing with asynchronous issues.

Last Updated: 07/22/2014<br/>
By: Claude Gauthier<br/>
E-Mail: claude_r_gauthier@hotmail.com<br/>

# Table of Contents

- Pre-Requisites
- Links
- Background
- The ExtJS Application
- Installation
- Running Tests for Karma/Jasmine 2.0
- Debugging
- Conclusion

## Pre-Requisites

This document will not teach you the ins and outs of Karma, Jasmine, ExtJS and/or NodeJS.

We are assuming you have at the very least written some ExtJS 4.x applications.  We also assume you have installed NodeJS and can at least check its version number via a command prompt.

As for Karma and Jasmine, again this isn't about learning the ins and outs of either one, but rather provide practical configuration and code samples, all designed to unit tests ExtJs based applications.

Basically this document's purpose is provide you the necessary info on how to use Karma with Jasmine to properly unit tests ExtJS applications.


## Links

For more information on any of these topics, it is recommended you visit the following links and resources:

- Karma<br/>http://karma-runner.github.io/0.12/index.html

- Jasmine<br/>http://jasmine.github.io/<br/>O'Reilly Books: http://shop.oreilly.com/product/0636920028277.do
  
- PhantomJS<br/>http://phantomjs.org/
  
- ExtJS<br/>www.sencha.com<br/>http://www.sencha.com/products/extjs/download/ext-js-4.2.1/


For practical information on testing JavaScript based applications, you should give this book at chance from O'Reilly.
http://shop.oreilly.com/product/0636920024699.do

Don't forget, Google and StackOverflow are great sites for finding information on these topics.


# Background

This document will detail how to get Karma and Jasmine up and running for testing ExtJS 4.x based applications.

Karma will be executed via NodeJS version 0.10.29, which is the latest one at the moment of writing this document.

The tutorial is based on a Windows 7 system, but there should not be any issue with using anything else supporting NodeJS.

In this document, you can expect the following:

- installation of Karma
- installation of Jasmine
- installation of PhantomJS
- installation of Karma coverage (provides a coverage report in percentages of your tests)
- installation of Karma HTML reporter (provides an HTML output for the tests)
- unit tests written for Jasmine to cover a simple ExtJS application including dealing with Asynchoronous calls.

To keep things simple here's a run down of what's what with all these technologies.

- Karma is a test runner.  That is basically nothing more than an tool spawning a web server with the purpose of executing test code against source code for any browsers configured to be connected to Karma's launch process.
The results of these tests show which tests have failed or passed.

- Jasmine is a Behavior Driven Development tool designed to test code and functions against user defined assumptions.  It can be used on it's own, or can be used with various test runners, including Karma.

- PhantomJS is a headless WebKit scriptable browser.  This means, there is no actual browser window.  

So in essence, tests are written in Jasmine, Karma will provide the glue necessary to drive the automation of these tests to the PhantomJS browser.


## The ExtJS Application

The ExtJS application used is based from the demo used by the Sencha website on Unit Testing.  It was adapted slightly only to be distributed with this document.

You should be able to adjust the index.html page to point to your version of ExtJS.  ExtJS 4.2.x and above should work fine.

It is recommended you use a webserver to serve your ExtJS application.  Setup something with Apache, IIS or whatever you are most comfortable with.  You can always check out the XAMPP application which is probably the easiest way to get a web server up and running.
https://www.apachefriends.org/index.html

I will be assuming you have your app at a root folder of a web server folder such as: htdocs/karma_jasmine_extjs_demo folder.

The file you downloaded also contains the tests and the setup for the tests.  We will review those later in the document.


## Installation

We are assuming you have installed NodeJS.  If you don't know how, please visit http://nodejs.org/ for information on how to provide it and install it on your system.

Once you have installed NodeJS, ensure it is functional.

At the command prompt of your terminal window, type <code>node --version</code> and you should expect a version number as feedback.

From the same command prompt, go to your ExtJS application folder directory.

This is where we will be setting up all of NodeJS npm modules.

The following is a list of statements to be entered at the command prompt.  You will press 'Enter' after each statement and wait for the installation to be finished before doing the next statement.

<pre>
npm install karma --save-dev
npm install karma-cli --save-dev
npm install phantomjs --save-dev
npm install karma-jasmine@2_0 --save-dev
npm install karma-coverage --save-dev
npm install karma-html-reporter --save-dev
npm install karma-phantomjs-launcher --save-dev
</pre>
and if you plan on debugging with a browser:
<pre>
npm install karma-chrome-launcher (for chrome)
npm install karma-firefox-lancher (for firefox)
npm install karma-ie-launcher (for ie browsers)
</pre>

The Karma docs contain a list of browser support.

When you have done all of these installations, you will notice a <code>node_modules</code> folder.  

We can now proceed with the tests.

The version of Karma installed by default is version 0.12.17.

## Running Tests for Karma/Jasmine 2.0

1. Launching your test

Since this is written for Windows, there is a batch file to start the test, the file is <code>karma_start.bat</code>
The file contains a one line statement as follows: <code>node node_modules\karma\bin\karma start karma_start.js</code>

We are launching karma via a module configuration file named <code>karma_start.js</code>

2. karma_start.js
<pre>
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
</pre>

3. karma_app_test.js

<pre>
var karmaLoadedFunction = window.__karma__.loaded;
window.__karma__.loaded = function() {};

Ext.onReady(function() {
    console.log('Starting Tests...');
    window.__karma__.loaded =  karmaLoadedFunction;
    window.__karma__.loaded();
});
</pre>

4. karma_extjs_appconfig.js

<pre>
Ext.Loader.setConfig({
   enabled: true,
   paths: {
       'AM': 'base/app'
   },
   disableCaching: false 
});

// if you have other overrides for ExtJS, this is a good place to add them, 
// or you add them as seperate files after this file in the files:[] array in your karma_start.js config.

// Ext.Ajax.timeout = 300000;
</pre>

Once the test is launched, you will see a lot of information in your command window.  
If everything went well with your installation, you will have a statement towards the end displaying: <code>Executed 4 of 4 SUCCESS.</code>

2 new folders will be added to your project <code>karma_dir</code> and <code>coverage</code>.

Each will have a subfolder with the browser name and inside at the very least an <code>index.html</code> file which you can open in your browser to view the report.

## Debugging

You have many tools available for debugging your unit tests.

1. In the <code>karma_start.js</code> file, you will setup the following configs:

<pre>
logLevel: config.LOG_DEBUG, // this is useful to view what Karma is doing
browsers: ["Chrome"], // use a browser such as Chrome, Firefox, etc.
singleRun: false // set this to false for debugging
</pre>

2. In your code, add <code>debugger</code> statements where your need them to be.

3. When you run the <code>karma_start.bat</code> file, a browser window will open.

4. There will be a debug link at the top right. Click on it.

5. A new browser tab should open.

6. Open the browser's debugger in that tab (<code>F12</code> is the typical key)

7. Click your browser's reload button while in that tab

8. The execution of your code should be halted at the first logical debugger statement.

## Conclusion

Testing ExtJS isn't as straight forward as it would seem.  However, the app-tests/example should provide enough for anyone to test ExtJS 4.x and even 5.x correctly using Karma with Jasmine 1.x.

It is highly possible that I might not be correct in using these technologies, or there are some bugs which could be resolved.

With that, I've got this list below, anyone with expertise on these topics are welcome to contribute.

1. Karma: why do I have to set <code>urlRoot: /base/</code>?
2. Karma: why I'm forced to hardcode my <code>basePath</code> to my logical drive and file system?
3. Jasmine: Is there a way bring back and improve <code>waitsFor</code> for Ajax calls?
4. Jasmine: the done() method and the techniques to test Async calls do not apply very well to ExtJS, wouldn't it better to bring back the waitsFor/runs combo and let testers choose which works best.  There are comments made by Sencha staff online specifically saying that ExtJS 5.0 won't be implementing Promises/Deferred, especially to their Store/Model implementation.

