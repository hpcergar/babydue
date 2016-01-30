var request = require('supertest'),
    app = require('./app'),
    fakeUser = {email: 'abc@mail.com', hash: 'aaabbbccc', date: '2016-02-01', gender: 'm'}
    ;


describe('Requests to the root path', function () {
    it('Returns a 200 status code', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Returns a HTML format', function (done) {
        request(app).get('/')
            .expect('Content-Type', /html/, done);
    });

    it('Returns an index file with bets', function (done) {
        request(app).get('/')
            .expect(/bets/i, done);
    });

});

describe('Creating new bet', function () {
    it('Returns a 201 status code', function (done) {
        request(app)
            .post('/bets')
            .send('email=' + fakeUser.email + '&date=' + fakeUser.date + '&gender=' + fakeUser.gender + '&hash=' + fakeUser.hash)
            .expect(201, done);
    });
    it('Returns the bet', function (done) {
        request(app)
            .post('/bets')
            .send('email=' + fakeUser.email + '&date=' + fakeUser.date + '&gender=' + fakeUser.gender + '&hash=' + fakeUser.hash)
            .expect(/2016-02-01/, done);
    });

    after(function () {
        // Remove the test bet
        request(app).delete('/bets/' + fakeUser.email)
            .expect('204', done);
    })
});


describe('Updating bet', function(){
    it('Returns a 200 status code', function(done){
        request(app)
            .put('/bets/' + fakeUser.email)
            .send('email=' + fakeUser.email + '&date=' + fakeUser.date + '&gender=' + fakeUser.gender + '&hash=' + fakeUser.hash)
            .expect(200, done);
    });

    it('Returns the bet', function (done) {
        request(app)
            .put('/bets/' + fakeUser.email)
            .send('email=' + fakeUser.email + '&date=' + fakeUser.date + '&gender=' + fakeUser.gender + '&hash=' + fakeUser.hash)
            .expect(/2016-02-01/, done);
    });
});



