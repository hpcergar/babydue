'use strict';

// TODO to config
var crypto = require('crypto'),
    salt = '2D23PsgZdDLMu225'
    ;

/**
 *
 * @param email
 * @returns {*|{}}
 */
var getSignature = function(email){
    return crypto
        .createHmac('sha256', salt)
        .update(email)
        .digest('hex');
};

/**
 * Validate request after verifying email and signature do match
 *
 * @param email
 * @param signature
 */
var validate = function(email, signature){
    return (signature === getSignature(email));
};


/**
 * Exposed methods
 *
 * @type {{validate: validate, getSignature: getSignature}}
 */
module.exports = {
    validate: validate,
    getSignature: getSignature
};