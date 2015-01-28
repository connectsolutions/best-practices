define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.View.extend({

        template: require('tpl!mymodule/templates/example.ejs'),
        attachToTemplate: true,

        events: {

        },

        /**
        * Peforms initialization operations for the view.
        */
        initialize: function() {

        },

        /**
        * Loads data for the view.
        */
        loadData: function() {
            this.collection.fetch()
                .fail(function() {
                    this.showErrorMessage('Unable to load notifications.');
                }.bind(this));
        },

        /**
        * Serializes the form data for easy use in the template.
        */
        serializeData: function() {
            return this.model.toJSON();
        }

    });

});
