var express = require('express'),
    app = express(),
    router = express.Router(),
    security = require('../controller/security')
    ;

router.use(function(request, response, next){
    // TODO switch lines back
    var email = request.query.email,
        signature = request.query.signature;
    if(!email || !signature || !security.validate(email, signature)){
        console.log('Error params: Email [' + email + '], Signature [' + signature + ']');
        return next(new HttpException(401, 'Unauthorized'));
    }

    next();
});


module.exports = router;