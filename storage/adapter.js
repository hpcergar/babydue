'use strict';

// TODO Load specified adapter by constructor
var config = require('../config/config'),
    fileAdapter = require('./fileAdapter')
//,mongoAdapter = require('./fileAdapter')

    ;



module.exports = function(){

    // TODO Load adapter by config storage type
    var adapter;

    // TODO for now, just fileAdapter
    adapter = fileAdapter;

    // return adapter
    return adapter;

}();
