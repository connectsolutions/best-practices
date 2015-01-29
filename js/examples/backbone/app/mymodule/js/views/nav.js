define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.View.extend({

        template: require('tpl!mymodule/templates/nav.ejs'),

        tagName: 'ul',

        className: 'nav container',

        id: 'appNav2',

        render: function() {
            this.$el.html(this.template(this));
            $('#appNav').hide();
            return this;
        },

    });

});
