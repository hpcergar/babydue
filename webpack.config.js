'use strict';

var webpack = require('webpack'),
    path = require('path');

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

    node: {
        fs: "empty"
    },

    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'public/js'),
                query: {
                    presets: 'es2015'
                }
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader",
                query: {
                    exclude:'node_modules',
                    helperDirs: [
                        __dirname + "/public/js/Helpers/Handlebars"
                    ]
                }
            }
        ]
    },

    resolve: {
        // Absolute path that contains modules
        root: __dirname,

        // Directory names to be searched for modules
        modulesDirectories: ['public/js', 'node_modules'],

        // Replace modules with other modules or paths for compatibility or convenience
        alias: {
            'underscore': 'lodash',
            'handlebars': 'handlebars/runtime.js'
        }
    },

    // Create Sourcemaps for the bundle
    devtool: 'source-map',

};