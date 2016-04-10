define(function(require){
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        datepicker = require('jquery-ui/datepicker'),
        remodal = require('remodal'),
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

        className: 'remodal-bg',

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

            // Delayed init modal so it can add events to rendered tags
            if(!this.modal){
                this.modal = this.$el.find('[data-remodal-id=modal]').remodal({hashTracking:false});
            }

            if(!view || !this.modal){
                return;
            }

            // Call Modal
            this.modal.$modal.find('[data-remodal-content=main]').html(view.render().$el);
            this.modal.open();
        },

        showFlashMessage: function(options){
            // TODO Use Noty (http://ned.im/noty/#/about) to flash messages
        }
    });

    return MainView;
});
