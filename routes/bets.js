var express = require('express'),
    app = express(),
    router = express.Router();


router.route('/')
    .get(function (request, response) {
        // TODO List bets mapped by date
    })

    .post(function (request, response) {
        // TODO Check availability of date
        // TODO Save bet by email
    })
;


router.route('/:email')
    .put(function (request, response) {
        var email = request.params.email;

        // TODO Check availability of date
        // TODO Update bet by email
    })
;

module.exports = router;