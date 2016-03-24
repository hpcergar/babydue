/**
 * Handlebars Helper loaded by webpack's handlebars loader
 * registering this file's name as the helper name ("t" here)
 */

var messages = require('Lib/Messages');

// Exports as "t" helper
module.exports = messages.translate;
