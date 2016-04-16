'use strict';

var fs = require('fs'),
    path = require('path'),
    file = path.join(__dirname, '..', 'data', 'bets.json')
;


/**
 * Load file data
 *
 * @storage
 *
 * @param callback
 */
// TODO table via namespace
function fetch(callback){
    // Change to sync version due to multiple callback calls in async
    var data = fs.readFileSync(file, 'utf8');
    callback(null, data);
}

/**
 *
 * @todo there is something smelly in this callback call...
 *
 * @storage
 *
 * @param data
 * @param callback
 */
function flush(data, callback){
    fs.writeFile(file, JSON.stringify(data), function(err){
        if(err) throw err;
        console.log('Flushed');
        callback();
    });
}

module.exports = {
    fetch: fetch,
    flush: flush
};