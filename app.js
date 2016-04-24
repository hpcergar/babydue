var express = require('express'),
    security = require('./routes/security'),
    login = require('./routes/login'),
    bets = require('./routes/bets')
    ;

var Main = function(){

    var self = this;

    self.setupVariables = function(){
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        console.log('Port ' + self.port);
        console.log('Port openshift ' + process.env.OPENSHIFT_NODEJS_PORT);
        console.log('IP ' + self.ipaddress);

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
        self.app.use('/', express.static('public'));
        self.app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
        self.app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui/themes/base/minified'));
        self.app.use('/remodal', express.static(__dirname + '/node_modules/remodal/dist'));

        // Add security layer
        self.app.use('/bets', security);
        self.app.use('/bets', bets);

        self.app.use('/login', security);
        self.app.use('/login', login);

        
    };

    self.start = function(){
        self.setupVariables();
        self.initializeServer();

        self.app.listen(self.port, self.ipaddress, function(){
            console.log('Starting app on port ' + self.port);
        });
    }
};




var App = new Main();
App.start();
