import CryptoJS from 'crypto-js';


/**
 * Generate encrypted token by email
 * 
 * @param email
 * @param signature
 * @returns {*|string}
 */
function generateToken(email, signature) {
    var rawStr = email + ':' + signature;
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(rawStr));
}

/**
 * Generate auth header authentication
 * @returns {{Authorization: string}}
 */
function generateAuthHeader(){
    console.log('auth data: ' + window.app.conf.EMAIL + ' : ' + window.app.conf.SIGNATURE);
    return {'Authorization': 'Bearer ' + generateToken(window.app.conf.EMAIL, window.app.conf.SIGNATURE)};
}


export default generateAuthHeader;