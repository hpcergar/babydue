define(function(require){
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        Backbone = require('backbone'),
        template = require('./Templates/Main.hbs')
    ;
    
    var MainView = Backbone.View.extend({
        template: template,
        
        render: function(){
            this.$el.html(template);
            return this;
        }
    });

    return MainView;
});
