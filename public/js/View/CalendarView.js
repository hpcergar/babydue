define(function (require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        jQuery = require('jquery'),
        dateHelper = require('../Helpers/Date').default,
        // datepicker = require('jquery-ui/datepicker'),
        // datepickerOriginal = require('jquery-ui/datepicker'),
        datepicker = require('../Helpers/DatepickerCustom'),
        Backbone = require('backbone'),
        dateBetSetCollection = require('../Model/DateBetSetCollection').default,   // Yes, as it's exporting the "default" object
        template = require('./Templates/CalendarIcons.hbs')
    // ,
    // BetCollection = require('../Model/BetCollection'),
    // betCollection = new BetCollection();
        ;

    // TODO Dirty hack
    // $(function () {
    //     $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
    //     $.datepicker._updateDatepicker = function (inst) {
    //         $.datepicker._updateDatepicker_original(inst);
    //         var afterShow = this._get(inst, 'afterShow');
    //         if (afterShow)
    //             afterShow.apply((inst.input ? inst.input[0] : null));  // trigger custom callback
    //     }
    // });

    var CalendarView = Backbone.View.extend({

        template: template,

        defaults: {
            currentUserBet: null,
            datepicker: null
        },

        // List of bets


        initialize: function () {

            // Main events here
            this.listenTo(dateBetSetCollection, 'reset', this.addAll); // When fetching / reset

            // TODO Event listenTo Collection event (add? update?)
            this.listenTo(dateBetSetCollection, 'TODO', this.render); // TODO Change event?

            // Fetch bets data
            dateBetSetCollection.fetch({reset: true});
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

        /**
         * Method to be executed for each day in the calendar
         *
         * @param date Current rendering date
         * @returns {*[]}   [bool, css classes, tooltip text]
         */
        calendarEachDay: function (date) {
            var d = dateHelper.parseIsoDate(date),
                currentBets = dateBetSetCollection.findByDate(d),
                classes = [],
                tooltip = []
                ;
            // Get css classes and tooltips
            if (undefined !== currentBets && currentBets.get('betCollection').length > 0) {
                classes.push('dayWithBets');
                currentBets.get('betCollection').forEach(function (bet) {
                    classes.push(bet.get('gender'));
                    tooltip.push(bet.get('name'));

                    // Current User's css class
                    if (bet.get('email') == window.app.conf.EMAIL) {
                        classes.push('currentSelection');
                    }
                });
            }

            return [true, classes.join(' '), tooltip.join(' - ')];
        },

        calendarAddIcons: function () {

            this.$el.find('.dayWithBets').each(_.bind(function (i, v) {
                var fragment = document.createDocumentFragment(),
                    classes = v.className.split(' '),
                    context =  {
                        m: classes.indexOf('m') !== -1,
                        f: classes.indexOf('f') !== -1,
                        d: classes.indexOf('d') !== -1
                    }
                    ;
                // $(v).append(jQuery.parseHTML(this.template(context)));
                // fragment.innerHTML(this.template(context));
                v.insertAdjacentHTML('beforeend', this.template(context));
            }, this));
            // TODO Add icons once calendar is rendered
            console.log('calendarAddIcons');

        },

        calendarSelect: function (date) {
            var d = date.toISOString().substring(0, 10),
                currentBets = dateBetSetCollection.findByDate(d);

            // TODO Trigger the modal with bets as parameter
            // TODO Trigger event on the observer for the modal?
        },

        // TODO Prepare calendar data
        addAll: function () {
            // TODO Set current user if it exists
            this.currentUserBet = dateBetSetCollection.findBetByEmail(window.app.conf.EMAIL || '');

            this.render();
        }


    });

    return CalendarView;
});
