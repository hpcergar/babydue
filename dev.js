/**
 * Dev file to test
 *
 * @type {exports|module.exports}
 */


var security = require('./controller/security');


var email = 'jek_@hotmail.com';


console.log(security.getSignature(email));
