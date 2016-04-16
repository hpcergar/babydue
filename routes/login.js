var express = require('express'),
    app = express(),
    router = express.Router()
    ;

/**
 * Main route, just let security middleware act
 */
router.route('/')
    .get(function (request, response) {
        response.json( {login:'ok'} );
    })
;


module.exports = router;