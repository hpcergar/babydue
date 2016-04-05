var express = require('express'),
    app = express(),
    router = express.Router(),
    security = require('../controller/security')
    ;

router.use(function(request, response, next){
    var email = request.query.email,
        signature = request.query.signature;
    if(!email || !signature || !security.validate(email, signature)){
        console.log('Error params: Email [' + email + '], Signature [' + signature + ']');
        var error = new Error('Unauthorized');
        error.status = 401;
        return next(error);
    }

    next();
},
// Error handle middleware
function(err, req, res, next){
    console.error(err.stack);
    res.status(err.status).send(err.message);
});


module.exports = router;