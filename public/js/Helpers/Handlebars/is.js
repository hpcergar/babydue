/**
 * Handlebars Helper loaded by webpack's handlebars loader
 * registering this file's name as the helper name ("t" here)
 */

// Exports as "t" helper
module.exports = function(value, test, options){
    if(value && value == test){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
};
