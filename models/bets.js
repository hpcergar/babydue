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
        return;
    }
    getDataFromFile(callback);
}

/**
 * Load file data
 * @param callback
 */
function getDataFromFile(callback){
    // Find in file
    //fs.readFile(file, 'utf8', function(err, data){
    //    if(err) callback(new Error('No data source available'), null);
    //    dataCached = JSON.parse(data);
    //    console.log('Data retrieved from file');
    //    callback(null, dataCached);
    //});

    // Change to sync version due to multiple callback calls in async
    var data = fs.readFileSync(file, 'utf8');

    dataCached = JSON.parse(data);
    console.log('Data retrieved from file');

    callback(null, dataCached);
}

/**
 *
 * @todo there is something smelly in this callback call...
 *
 * @param callback
 */
function flush(callback){

    var data = JSON.stringify(dataCached);
    fs.writeFile(file, data, function(err){
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
        if(err){
            callback(err, data);
            return;
        }

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
 * Save to cached buffer data
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

/**
 * Delete from cached buffer data
 * @param data
 */
function deleteBet(data){
    var bets = dataCached.bets;
    if(data && bets[data.date]){
        delete bets[data.date][data.gender];
        console.log('Bet removed from cached data');
    }

    dataCached.bets = bets;

    console.log('Nothing to remove');
}


/**
 *
 * @param email
 * @param callback
 */
function deleteByEmail(email, callback){

    findByEmail(email, function(err, data){
        if(err){
            callback(err);
            return;
        }
        if(data){
            deleteBet(data);
        }
        callback();
    });
}

function findByEmail(email, callback){
    // Map bets by email
    getBets(function(err, data){
        var map = mapByEmail(data),
            returnedData
            ;

        if(err){
            callback(err);
            return;
        }

        // If not found, return
        if(!map[email]){
            console.log('Email ' + email + ' not found');
        }else{
            returnedData = map[email];
            returnedData.email = email;
            console.log('Email ' + email + ' found');
        }

        callback(null, returnedData);
    });
}

/**
 * Map cached data into a list of emails with selected date and gender
 * @param data
 * @returns {{}}
 */
function mapByEmail(data){
    var map = {};

    // Loop over dates
    for (var date in data) {
        if (data.hasOwnProperty(date)){
            // Loop over possible genders
            for (var gender in data[date]) {
                if (data[date].hasOwnProperty(gender)){
                    // Set a list of emails-based key with selected date and gender
                    map[data[date][gender]] = {date : date, gender : gender}
                }
            }
        }
    }

    return map;
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
    getBets(function(err, data){
        if(data[bet.date] && data[bet.date][bet.gender] && data[bet.date][bet.gender] != bet.email){
            callback( new Error('Date already taken by ' + data[bet.date][bet.gender]) );
            return;
        }

        console.log('Bet available');
        callback();
    })
};


exports.save = function(data, callback){
    // Remove previous bet if found for email
    deleteByEmail(data.email, function(err){
        if(err){
            callback(err);
            return;
        }
        // save to JSON and save
        saveBet(data);
        flush(callback);
    })
};









