'use strict';

var users = require('../data/users.json');


/**
 *
 * @param email
 * @returns {object|boolean}
 */
exports.getUserByEmail = function(email){
    if(users[email] && users[email]['name']){
        console.log('Name ' + users[email]['name'] + ' found for email ' + email);
        return users[email]['name'];
    }

    console.log('Email not found ' + users[email]);

    return false;
};

/**
 * Validates given gender
 * @param email
 * @returns {boolean}
 */
exports.isValidUser = function(email){
    return (false !== this.getUserByEmail(email));
};


/**
 * Filter users by level
 * 
 * @param level
 * @returns {{}}
 */
exports.getUsersByLevel = function(level){
    var result = {};

    Object.keys(users).forEach(function(key){
        if(users[key]['level'] && level === users[key]['level']){
            result[key] = users[key]; 
        }
    });
    
    return result;
};









