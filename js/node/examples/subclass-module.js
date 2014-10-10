'use strict';

var _ = require('underscore');
var Config = require('./constructor-module');

// constructor
var ProductionConfig = function(){
  // override instance value
  this.environment = 'production';
};
// subclass from the Config base class
ProductionConfig.prototype = Object.create(Config.prototype);
// extend the base class with additional functions
_.extend(ProductionConfig.prototype, {
  getBaseUrl: function() {
    return 'http://api.production.io';
  }
});

module.exports = ProductionConfig;
