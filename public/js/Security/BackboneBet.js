import Backbone from 'backbone';
import Auth from './Auth';

/*
 * Store a version of Backbone.sync to call from the
 * modified version we create
 */
var backboneSync = Backbone.sync;


Backbone.sync = function (method, model, options) {
    /*
     * The jQuery `ajax` method includes a 'headers' option
     * which lets you set any headers you like
     */
    options.headers = Auth();

    /*
     * Call the stored original Backbone.sync method with
     * extra headers argument added
     */
    backboneSync(method, model, options);
};

module.exports = Backbone;