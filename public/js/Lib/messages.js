define(function (require) {
'use strict';

var dicts = {
        en: require('./I18n/en'),
        fr: require('./I18n/fr'),
        es: require('./I18n/es')
    },
    dict;


return {
    translate: translate,
    setDictionary: setDictionary
};


function translate(msg) {
    if (! dict) return msg;
    var translated = dict[msg];
    if (! translated) console.warn('translate: ', msg);
    return translated || msg;
}

function setDictionary(lang) {

    if (! lang || ! dicts[lang]) return;
    dict = dicts[lang];
}


});