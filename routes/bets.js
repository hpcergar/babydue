var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    // urlencoded = bodyParser.urlencoded({ extended: false}),
    jsonencoded = bodyParser.json(),
    router = express.Router(),
    bets = require('../controller/bets')
    ;


/**
 * Handle insertion/update
 *
 * @param request
 * @param response
 * @param errorCode
 */
function handleUpsert(request, response, errorCode){

    var email = request.query.emailOrig || request.query.email;

    bets.save(request.body, email, function(error){
        if(error){
            console.log(error.message);
            response
                .status(errorCode)
                .json({ error: error.message });
            return;
        }

        response
            .status(201)
            .json(request.body);
    });
}


router.route('/')
    .get(function (request, response) {
        bets.get(function(error, names){
            if(error){
                response
                    .status(404)
                    .json({ error: error.message });
                return;
            }
            response.json( names );
        });
    })

    .post(jsonencoded, function (request, response) {
        handleUpsert(request, response, 409);
    })
;


router.route('/:email')
    .put(jsonencoded, function (request, response) {
        handleUpsert(request, response, 404);
    })
;

module.exports = router;