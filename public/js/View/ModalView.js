define(function (require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        jQuery = require('jquery'),
        dateHelper = require('../Helpers/Date').default,
        Backbone = require('backbone'),
        template = require('./Templates/Modal.hbs')
        ;

   
    // TODO "Do your bet" view
    // No need to 
    var ModalView = Backbone.View.extend({

        template: template,

        defaults: {
            observer: null,
            onSuccess: null,
            currentBets: null
        },

        // List of bets
        initialize: function (options) {

            // Set event data
            this.observer = options.observer;
            this.onSuccess = options.onSuccess;
            this.currentBets =  options.currentBets;

            // Main events here
            // this.listenTo(dateBetSetCollection, 'reset', this.addAll); // When fetching / reset

            
        },

        render: function () {

            this.$el.html(template);            

            return this;
        }
        
        

    });

    return ModalView;
});
