define(function (require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        jQuery = require('jquery'),
        dateHelper = require('../Helpers/Date').default,
        Backbone = require('backbone'),
        template = require('./Templates/Modal.hbs')
        ;


    // "Do your bet" view
    var ModalView = Backbone.View.extend({

        template: template,

        className: 'choicesModal container-fluid',

        defaults: {
            observer: null,
            onSuccess: null,
            bets: null
        },

        events:{
            'click button.choice' : "handleBet"
        },

        // List of bets
        initialize: function (options) {

            // Set event data
            this.observer = options.observer;
            this.onSuccess = options.onSuccess;
            this.bets = options.currentBets;

            // Main events here
            // this.listenTo(dateBetSetCollection, 'reset', this.addAll); // When fetching / reset
        },

        render: function () {
            
            var choices = ['m', 'f', 'd'],  // Also controls gender display order
                bets = this.bets.get('betCollection'),
                context = {
                    date: this.bets.get('date'),
                    bets: {},   // every gender with/without current bet
                    currentUserBet: this.model.toJSON()
            };
            
            for(var i = 0, current; i < choices.length; i++){
                current = bets.findBetByGender(choices[i]);
                context.bets[ choices[i] ] = ( current ? current.toJSON() : current);
            }

            this.$el.html(this.template(context));

            return this;
        },

        /**
         * Handle toggle bet button
         */
        handleBet: function(e){
            console.log('handled!');
            // TODO Get data from clicked el (param e)
            var date = e.currentTarget.getAttribute('data-date'),
                gender = e.currentTarget.getAttribute('data-gender')
            ;

            // If user sent bet, fill the model and send to server
            this.model.set({
                date:date,
                gender:gender,
                email:window.app.conf.EMAIL
            });

            this.saveBet(e.currentTarget);


            // If user deselected bet, remove from server
            //this.removeBet();

        },

        /**
         * Save bet in server
         */
        saveBet: function(el){
            this.model.save(null, {
                success :_.bind(function() {

                    // TODO Remove other "btn-success" classes
                    this.$el.find('.btn-success').removeClass('btn-success');

                    // Then add new
                    el.classList.add('btn-success');

                    // Notify
                    this.onSaveSuccess()
                }, this),
                error: this.onSaveError});
        },

        removeBet: function(){
            // TODO
            // this.model.destroy();

            this.onSaveSuccess();
        },

        /**
         * When sending data to server, if everything ok, notify observer
         */
        onSaveSuccess:function(){



            // Fire events on observer
            this.observer.trigger(this.onSuccess);
        },

        onSaveError:function(){
            // TODO
        }


    });

    return ModalView;
});
