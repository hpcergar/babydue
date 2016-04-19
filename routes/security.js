var express = require('express'),
    app = express(),
    router = express.Router(),
    CryptoJS = require('crypto-js'),
    security = require('../controller/security'),
    users = require('../models/users')
    ;


function sendError(msg){
    var error = new Error(msg || 'Unauthorized');
    error.status = 401;
    return error;
}


router.use(function(request, response, next){
    // var email = request.query.email,
    //     signature = request.query.signature;
    if(!request.headers.authorization){
        console.log('No header authorization sent');
        return next(sendError('Unauthorized: missing auth token'));
    }

    var bearer = request.headers.authorization.split(' ')[1], // get bearer from auth http header
        decoded = CryptoJS.enc.Base64.parse(bearer).toString(CryptoJS.enc.Utf8),
        email = decoded.split(':')[0],
        signature = decoded.split(':')[1];

    // decoded = new Buffer(bearer, 'base64').toString('utf8');

    if(!email || !signature || !security.validate(email, signature)){
        console.log('Error params: Email [' + email + '], Signature [' + signature + ']');
        return next(sendError());
    }

    // Is email in authorized list?
    if(false === users.isValidUser(email)){
        console.log('Error: unrecognized user [' + email + ']');
        return next(sendError());
    }
    
    // Forward original authenticated email to other middlewares
    request.query.emailOrig = email;

    next();
},
// Error handle middleware
function(err, req, res, next){
    console.error(err.stack);
    res.status(err.status).send(err.message);
});


module.exports = router;