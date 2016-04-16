define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        template = require('./Templates/Unauthorized.hbs')
    ;
    
    var UnauthorizedView = Backbone.View.extend({
        template: template,
        initialize: function(){},
        render: function(){
            this.$el.html(template);
            return this;
        }
    });

    return UnauthorizedView;
});
