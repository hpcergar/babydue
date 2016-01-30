var express = require('express'),
    bets = require('routes/bets')
    ;

var Main = function(){

    var self = this;

    self.setupVariables = function(){
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        }
    };

    self.initializeServer = function(){
        self.app = express();
        self.createRoutes();
    };

    self.createRoutes = function(){
        self.app.use(express.static('public'));

        self.app.use('/bets', bets);
    };

    self.start = function(){
        self.setupVariables();
        self.initializeServer();

        self.app.listen(port, function(){
            console.log('Starting app');
        });
    }
};




var App = new Main();
App.start();
