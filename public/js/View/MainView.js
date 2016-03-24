define(function(require){
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        datepicker = require('jquery-ui/datepicker'),
        Backbone = require('backbone'),
        template = require('./Templates/Main.hbs')
    ;
    
    var MainView = Backbone.View.extend({
        template: template,
        
        render: function(){
            this.$el.html(template);

            // Load Calendar
            // TODO fetch and add data
            this.$el.find('#calendar')
                .datepicker({
                    numberOfMonths: 2,
                });

            return this;
        }
    });

    return MainView;
});
