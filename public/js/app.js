import 'es5-shim';

import App from 'Router/Router';
import Messages from 'Lib/Messages';
import _ from 'lodash';


var lang = navigator.language,
    conf = _.extend({
        LANG: /fr/.test(lang) ? 'fr' : (/es/.test(lang) ? 'es' : 'en')
    });

// Init I18n
Messages.setDictionary(conf.LANG);

// Go!
var app = new App(conf);

app.start();

