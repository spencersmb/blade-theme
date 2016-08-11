'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './assets/js/custom';
        // this.sourceApp = this.source + 'products-app/';

        this.tsOutputPath = 'assets/js';
        this.allJavaScript = ['./assets/js/**/*.js'];
        this.allTypeScript = './assets/js/custom/**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;