define(function (require) {

    'use strict';

    var Backbone     = require('backbone');

    var ExampleModel = require('mymodule/models/example');

    return Backbone.Collection.extend({

        model: ExampleModel

    });

});
