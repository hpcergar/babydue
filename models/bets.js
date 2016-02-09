'use strict';

var fs = require('fs'),
    path = require('path'),
    file = path.join(__dirname, '..', 'data', 'bets.json'),
    dataCached,
    validGenders = {
        'm':'man',
        'f':'women',
        'd':'dragon'
    }
    ;




exports.getAll = getBets;



/**
 * Get data from cache of file
 * @param callback
 */
function getData(callback){
    if(dataCached){
        callback(null, dataCached);
    }
    getDataFromFile(callback);
}

/**
 * Load file data
 * @param callback
 */
function getDataFromFile(callback){
    // Find in file
    fs.readFile(file, function(err, data){
        if(err) callback(new Error('No data source available'), null);
        dataCached = JSON.parse(data);
        console.log('Data retrieved from file');
        callback(null, dataCached);
    });
}

/**
 *
 * @todo there is something smelly in this callback call...
 *
 * @param callback
 */
function flush(callback){
    fs.writeFile(file, dataCached, function(err){
        if(err) throw err;
        console.log('Flushed');
        callback();
    });
}

/**
 * Filter data, get only bets
 * @param callback
 */
function getBets(callback){
    getData(function(err, data){
        if(err) callback(err, data);
        // Get only bets
        callback(null, data.bets);
    })
}


/**
 * Get genders values
 * @returns {Array}
 */
function getGenders(){
    return Object.keys(validGenders);
}

/**
 * Save to cached buffedata
 * @param data
 */
function saveBet(data){
    var bets = dataCached.bets;
    if(!bets[data.date]){
        bets[data.date] = {}
    }

    bets[data.date][data.gender] = data.email;

    dataCached.bets = bets;

    console.log('Bet cached in data');
}



function deleteByEmail(email, callback){

    // TODO
    console.log('Deleted by email');

    console.log('Nothing to delete');
}


/**
 * Validates given gender
 * @param gender
 * @returns {boolean}
 */
exports.isValidGender = function(gender){
    return (getGenders().indexOf(gender) != -1);
};

/**
 * Check if date is free of use
 *
 * Considering data is mapped by date
 *
 * @param bet
 * @param callback
 */
exports.isBetAvailable = function(bet, callback){
    getData(function(err, data){
        // TODO this is not correct
        if(data[bet.date] && data[bet.date].gender == bet.gender && data[bet.date].email != bet.email){
            callback( new Error('Date taken by ' + data[bet.date].email) );
        }

        console.log('Bet available');
        callback();
    })
};


exports.save = function(data, callback){
    // TODO Remove previous bet if found for email
    deleteByEmail(data.email, function(err){
        if(err) callback(err);
        // TODO save to JSON and save
        saveBet(data);
        flush(callback);
    })
};









