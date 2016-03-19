var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    urlencoded = bodyParser.urlencoded({ extended: false}),
    router = express.Router(),
    bets = require('../controller/bets')
    ;


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

    .post(urlencoded, function (request, response) {
        // TODO The whole body? What about security args when posting?
        bets.save(request.body, function(error){
            if(error){
                response
                    .status(409)
                    .json({ error: error.message });
                return;
            }

            response
                .status(201)
                .json(request.body);
        });
    })
;


router.route('/:email')
    .put(function (request, response) {
        bets.save(request.body, function(error){
            if(error){
                response
                    .status(404)
                    .json({ error: error.message });
                return;
            }

            response
                .status(201)
                .json(request.body);
        });
    })
;

module.exports = router;