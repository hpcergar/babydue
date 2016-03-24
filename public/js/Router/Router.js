
/*
 Main controller
 */

define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        // BetListModel = require('js/Model/BetListModel'),
        MainView = require('View/MainView'),
        t = require('Lib/Messages').translate
    ;


    var router = Backbone.Router.extend({
        routes: {
            "": "index"
        },

        initialize: function () {
            var $rootEl = $('body');

            /*
            this.betListModel = new BetListModel();

            this.betListComboView = new BetListComboView({listModel: this.betListModel});

            $rootEl.append(this.betListComboView.render().$el);
             */
            this.mainView = new MainView();
            $rootEl.append(this.mainView.render().$el);

            // $rootEl.append($('<div>' + t('token_fail') + '</div>'));

            // this.betListModel.fetch();
        },

        start: function () {
            Backbone.history.start({pushState: true});
            return this;
        },
        index: function () {

        }
    });
    
    return router;
});


