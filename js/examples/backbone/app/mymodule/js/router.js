define(function (require) {

    'use strict';

    var Backbone          = require('backbone');

    var ExampleCollection = require('mymodule/collections/example');

    var NavView           = require('mymodule/views/nav');
    var ExampleView       = require('mymodule/views/example');

    return Backbone.Router.extend({

        routes: {
            'mymodule': 'showExampleView'
        },

        /**
        * Peforms initialization operations for the router.
        */
        initialize: function() {
            this.exampleCollection = new ExampleCollection();
        },

        /**
        * Sets up the navigation area display for usage.
        */
        showNav: function() {
            var nav = new NavView();
            csx.navContainer.setView(nav);
        },

        /**
        * Displays the main view.
        */
        showExampleView: function() {
            this.showNav();
            var view = new ExampleView({ collection: this.exampleCollection });
            csx.container.setView(view, {emptyDOM: true});
            view.loadData();
        }

    });

});
