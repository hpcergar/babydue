'use strict';

// TODO
var model = require('../models/bets'),
    // Date validation & transform
    moment = require('moment'),
    validator = require('validator')
    ;

exports.get = function (callback) {
    // TODO List bets mapped by date
    model.getAll(callback);
};

/**
 *
 * @param params
 * @param callback
 */
exports.save = function (params, callback) {

    // TODO Data validation
    var date = moment(params.date),
        email = params.email,
        gender = params.gender
        ;
    if(!date.isValid()){callback(new Error('Invalid date'), null);}
    if(!validator.isEmail(email)){callback(new Error('Invalid email'), null);}
    if(!model.isValidGender(gender)){callback(new Error('Invalid gender'), null);}

    // TODO Check availability of date
    model.isBetAvailable(params, function(err){
        /* params format: {
                "date" : "2016-01-01",
                "email" : "aaa@bbb.com",
                "gender" : "m", // m, f, d (dragon)
                }
                */
        if(err) callback(new Error('Date unavailable'), null);

        // TODO Save bet by email
        model.save({
            "date":date,
            "email":email,
            "gender":gender
        }, callback);
    });
};



