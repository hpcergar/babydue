var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    source = path.join(__dirname, '..', 'data', 'bets.json'),
    config = require('../config/config'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport(config.email.server),
    fileName = 'Bets_' + moment().format('YYYYMMDD') + '.json',
    backupPath = path.join(__dirname, '..', 'backup', fileName),
    mailOptions = {
        from: config.email.sender,
        to: config.email.recipients,
        subject: '[Babydue] backup ' + fileName,
        html: 'Good morning, <br><br>Here attached your great daily backup!<br><br>Have a wonderful day',
        attachments: [{
            filename: fileName,
            path: backupPath
        }]
    }
    ;


// Go for it!
copyFile(source, backupPath, function (err) {
    if (err) {
        return console.log(error);
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});


/**
 * Copy file
 * @param source
 * @param target
 * @param cb
 */
function copyFile(source, target, cb) {
    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on("error", function (err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function (err) {
        done(err);
    });
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}







