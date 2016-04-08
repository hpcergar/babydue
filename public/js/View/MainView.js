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
        
        stateModel: new (Backbone.Model.extend({
            defaults: {
                modal: false
            }
        }))(),
        
        template: template,

        initialize: function(){

            // TODO Main events here (Flash messages? Popup?)
            this.listenTo(this.stateModel, 'showModal', this.showModal);
            
            this.calendarView = new CalendarView({observer:this.stateModel});
        },
        
        render: function(){
            this.$el.html(template);

            // Load Calendar
            this.$el.find('#calendar').append(
                this.calendarView.render().$el
            );
            
            return this;
        },

        showModal: function(options){
            var view = options.view;
            
            if(!view ){
                return;
            }
            
            
            // TODO Call Modal
            // And add view content
            // this.$el.modal(view.render().$el)
        }
    });

    return MainView;
});
