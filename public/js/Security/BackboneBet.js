import Backbone from 'backbone';
import CryptoJS from 'crypto-js';

/*
 * Store a version of Backbone.sync to call from the
 * modified version we create
 */
var backboneSync = Backbone.sync;


function generateToken(email, signature) {
    var rawStr = email + ':' + signature;
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(rawStr));
}


Backbone.sync = function (method, model, options) {
    /*
     * The jQuery `ajax` method includes a 'headers' option
     * which lets you set any headers you like
     */
    options.headers = {
        /*
         * Set the 'Authorization' header and get the access
         * token from the `auth` module
         */
        'Authorization': 'Bearer ' + generateToken(window.app.conf.EMAIL, window.app.conf.SIGNATURE)
    };

    console.log('auth data: ' + window.app.conf.EMAIL + ' : ' + window.app.conf.SIGNATURE);

    /*
     * Call the stored original Backbone.sync method with
     * extra headers argument added
     */
    backboneSync(method, model, options);
};

module.exports = Backbone;