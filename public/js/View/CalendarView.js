define(function (require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        jQuery = require('jquery'),
        dateHelper = require('../Helpers/Date').default,
        datepicker = require('../Helpers/DatepickerCustom'),
        Backbone = require('backbone'),
        Bet = require('../Model/Bet').default,
        DateBetSet = require('../Model/DateBetSet').default,
        dateBetSetCollection = require('../Model/DateBetSetCollection').default,   // Yes, as it's exporting the "default" object
        ModalView = require('./ModalView'),
        t = require('Lib/Messages').translate,
        template = require('./Templates/CalendarIcons.hbs')
        ;

    var CalendarView = Backbone.View.extend({

        stateModel: new (Backbone.Model.extend({
            defaults: {}
        }))(),

        template: template,

        defaults: {
            currentUserBet: null,
            datepicker: null,
            calendarNumberOfMonths: 2
        },

        // List of bets


        initialize: function (options) {

            this.observer = options.observer;

            // Main events here
            this.listenTo(dateBetSetCollection, 'reset', this.addAll); // When fetching / reset

            // After sending a bet in the modal, refresh display 
            // trigger event in modalView
            this.listenTo(this.stateModel, 'refresh', this.loadData);

            // Add on resize for calendar number of months
            $(window).on("resize", _.throttle(_.bind(this.calendarOnResize, this), 50));

            // Fetch initial resolution
            this.calendarOnResize();

            // Fetch initial bets data
            this.loadData();
        },

        render: function () {

            // Load Calendar with data (if already loaded, else just display the calendar)
            if (null == this.datepicker) {
                this.datepicker = this.$el.datepicker({
                    numberOfMonths: this.calendarNumberOfMonths,
                    firstDay: 1, // Start with Monday
                    minDate: new Date('2016-05-01'),
                    maxDate: new Date('2016-06-21'),
                    dayNamesMin: t('calendar.dayNamesMin').split(','),

                    // Render each day method
                    beforeShowDay: this.calendarEachDay,
                    // On show
                    // onChangeMonthYear: this.calendarAddIcons,
                    afterShow: _.bind(this.calendarAddIcons, this),

                    // onSelect method
                    onSelect: _.bind(this.calendarSelect, this),

                });
            } else {
                this.$el.datepicker('refresh');
            }

            return this;
        },

        loadData: function () {
            this.currentUserBet = null;
            dateBetSetCollection.fetch({reset: true});
        },

        /**
         * Method to be executed for each day in the calendar
         * adding css classes for dates with events, current selection and estimated date
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
            
            if(d === window.app.conf.ESTIMATED_DATE){
                classes.push('estimatedDate');
            }

            return [true, classes.join(' '), ''];
        },

        /**
         * When rendered, add bets icons
         */
        calendarAddIcons: function () {

            if (false == dateBetSetCollection.size()) {
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

        /**
         * Select day in calendar callback
         * @param date
         * @param inst
         */
        calendarSelect: function (date, inst) {
            // As we added some html in <a> attribute, we cannot trust param date anymore
            var d = dateHelper.parseStringDate(
                    inst.selectedYear,
                    inst.selectedMonth,
                    inst.selectedDay
                ),
                currentBets = dateBetSetCollection.findByDate(d) || new DateBetSet({date:d});

            // Instantiate new view ModalView
            // Send this.stateModel as observer
            this.observer.trigger('showModal', {
                view: new ModalView({
                    model: (this._getUserBets() ? this._getUserBets() : new Bet()),
                    observer: this.stateModel,
                    onSuccess: 'refresh',
                    currentBets: currentBets
                })
            });
        },

        /**
         * Change number of months by browser resolution
         */
        calendarOnResize: function(){
            // Check screen width
            var width = $(window).width(),
            // If < 768px, then change number of months
                newNumberOfMonths = (width < 768 ? 1 : 2)
                ;

            if(this.calendarNumberOfMonths != newNumberOfMonths){
                this.calendarNumberOfMonths = newNumberOfMonths;
                if (null != this.datepicker){
                    this.$el.datepicker( "option", "numberOfMonths", this.calendarNumberOfMonths );
                }
            }

        },

        // Prepare calendar data
        addAll: function () {
            // Set current user if it exists
            this._getUserBets();

            this.render();
        },

        _getUserBets: function(){
            if(!this.currentUserBet){
                this.currentUserBet = dateBetSetCollection.findBetByEmail(window.app.conf.EMAIL || '');
            }

            return this.currentUserBet;
        }


    });

    return CalendarView;
});
