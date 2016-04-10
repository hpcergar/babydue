/**
 * Handlebars Helper loaded by webpack's handlebars loader
 * registering this file's name as the helper name
 */

// Exports as "dateformat" helper
module.exports = function(date){
    var objDate = new Date(date);

    return objDate.getDate()
    + '/'
    + (objDate.getMonth() + 1)
    + '/'
    + objDate.getFullYear();
};
