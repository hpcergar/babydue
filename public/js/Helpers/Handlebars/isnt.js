/**
 * Handlebars Helper loaded by webpack's handlebars loader
 * registering this file's name as the helper name ("isnt" here)
 */

// Exports as "isnt" helper
module.exports = function(value, test, options){
    if (value !== test) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
