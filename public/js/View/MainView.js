define(function(require){
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        datepicker = require('jquery-ui/datepicker'),
        Backbone = require('backbone'),
        template = require('./Templates/Main.hbs'),
        CalendarView = require('./CalendarView')
    ;
    
    var MainView = Backbone.View.extend({
        template: template,

        initialize: function(){

            // TODO Main events here (Flash messages? Popup?)
            
            this.calendarView = new CalendarView();
        },
        
        render: function(){
            this.$el.html(template);

            // Load Calendar
            this.$el.find('#calendar').append(
                this.calendarView.render().$el
            );
            
            return this;
        }
    });

    return MainView;
});
