'use strict';

var webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            './public/js/app.js'
        ]
    },

    output: {
        path: __dirname + '/public/js',

        filename: 'bundle.js',

        publicPath: '/js/'
    },

    resolve: {
        // Absolute path that contains modules
        root: __dirname,

        // Directory names to be searched for modules
        modulesDirectories: ['public/js', 'node_modules'],

        // Replace modules with other modules or paths for compatibility or convenience
        alias: {
            'underscore': 'lodash'
        }
    }

};