import 'es5-shim';

import App from 'Router/Router';
import Messages from 'Lib/Messages';
import _ from 'lodash';

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

var lang = navigator.language,
    conf = _.extend({
        LANG: /fr/.test(lang) ? 'fr' : (/es/.test(lang) ? 'es' : 'en'),
        EMAIL:  getURLParameter('email'),
        SIGNATURE: getURLParameter('signature')  
    });

// Init I18n
Messages.setDictionary(conf.LANG);

// Go!
var app = new App(conf);

app.start();

