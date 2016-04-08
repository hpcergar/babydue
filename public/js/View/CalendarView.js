define(function (require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        jQuery = require('jquery'),
        dateHelper = require('../Helpers/Date').default,
        datepicker = require('../Helpers/DatepickerCustom'),
        Backbone = require('backbone'),
        dateBetSetCollection = require('../Model/DateBetSetCollection').default,   // Yes, as it's exporting the "default" object
        ModalView = require('./ModalView'),
        template = require('./Templates/CalendarIcons.hbs')
        ;

    var CalendarView = Backbone.View.extend({

        stateModel: new (Backbone.Model.extend({
            defaults: {
                
            }
        }))(),
        
        template: template,

        defaults: {
            currentUserBet: null,
            datepicker: null
        },

        // List of bets


        initialize: function (options) {

            this.observer = options.observer;

            // Main events here
            this.listenTo(dateBetSetCollection, 'reset', this.addAll); // When fetching / reset

            // TODO Event listenTo Collection event (add? update?)
            //this.listenTo(dateBetSetCollection, 'TODO', this.render); // TODO Change event?

            // After sending a bet in the modal, refresh display 
            // TODO trigger event in modalView
            this.listenTo(this.stateModel, 'refresh', this.loadData);

            // Fetch initial bets data
            this.loadData();
        },

        render: function () {

            // Load Calendar with data (if already loaded, else just display the calendar)
            if (null == this.datepicker) {
                this.datepicker = this.$el.datepicker({
                    numberOfMonths: 2,

                    // Render each day method
                    beforeShowDay: this.calendarEachDay,
                    // On show
                    // onChangeMonthYear: this.calendarAddIcons,
                    afterShow: _.bind(this.calendarAddIcons, this),

                    // TODO onSelect method
                    onSelect: this.calendarSelect
                });
            } else {
                this.$el.datepicker('refresh');
            }

            return this;
        },
        
        loadData: function(){
            dateBetSetCollection.fetch({reset: true});
        },

        /**
         * Method to be executed for each day in the calendar
         *
         * @param date Current rendering date
         * @returns {*[]}   [bool, css classes, tooltip text]
         */
        calendarEachDay: function (date) {
            var d = dateHelper.parseIsoDate(date),
                currentBets = dateBetSetCollection.findByDate(d),
                classes = []
                ;
            // Get css classes and tooltips
            if (undefined !== currentBets && currentBets.get('betCollection').length > 0) {
                classes.push('dayWithBets');
                currentBets.get('betCollection').forEach(function (bet) {
                    classes.push(bet.get('gender'));

                    // Current User's css class
                    if (bet.get('email') == window.app.conf.EMAIL) {
                        classes.push('currentSelection');
                    }
                });
            }

            return [true, classes.join(' '), ''];
        },

        /**
         * When rendered, add bets icons 
         */
        calendarAddIcons: function () {

            if(false == dateBetSetCollection.size()){
                return;
            }
            
            this.$el.find('.dayWithBets').each(_.bind(function (i, v) {
                var link = v.getElementsByTagName("a")[0],
                    d = dateHelper.parseStringDate(v.getAttribute('data-year'), v.getAttribute('data-month'), link.innerHTML),
                    currentBets = dateBetSetCollection.findByDate(d),
                    context = {bets: currentBets.get('betCollection').toJSON()}
                    ;
                
                link.insertAdjacentHTML('afterbegin', this.template(context));
            }, this));
        },

        // TODO
        calendarSelect: function (date) {
            var d = dateHelper.parseIsoDate(date),
                currentBets = dateBetSetCollection.findByDate(d);
            
            // TODO Instantiate new view ModalView
            // Send this.stateModel as observer
            this.observer.trigger('showModal', {
                view:new ModalView({
                    observer:this.stateModel,
                    onSuccess:'refresh',
                    currentBets:currentBets
                })
            });
        },

        // Prepare calendar data
        addAll: function () {
            // Set current user if it exists
            this.currentUserBet = dateBetSetCollection.findBetByEmail(window.app.conf.EMAIL || '');

            this.render();
        }


    });

    return CalendarView;
});
