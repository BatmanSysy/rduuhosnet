/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
    'styles/**/*.css',

    '!styles/**/app/*.css',
    'styles/**/app/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

    // Load core libs before everything else
    'js/dependencies/lodash.js',
    'js/dependencies/angular.js',

    // Dependencies like jQuery, or Angular are brought in here
    'js/dependencies/**/*.js',

    // load angular-material.js at last of angular's series.
    '!js/dependencies/angular-material.js',
    'js/dependencies/angular-material.js',

    // load module first.
    'js/app/modules/*.js',

    // All of the rest of your client-side js files
    // will be injected here in no particular order.
    'js/**/*.js',

    // exclude app.js for rearrange it again.
    '!js/app/app.js',
    'js/app/app.js',

];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
    'templates/**/*.html'
];



// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';


// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(transformPath);
module.exports.jsFilesToInject = jsFilesToInject.map(transformPath);
module.exports.templateFilesToInject = templateFilesToInject.map(transformPath);

// Transform paths relative to the "assets" folder to be relative to the public
// folder, preserving "exclude" operators.
function transformPath(path) {
    return (path.substring(0, 1) == '!') ? ('!' + tmpPath + path.substring(1)) : (tmpPath + path);
}