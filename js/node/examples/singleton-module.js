'use strict';

// constructor
var Config = function(){
  // instance variable
  this.environment = 'test';
  this.url = '';
};

var concat = function(str1,str2) {
  return str1 + str2;
};

// static function
Config.getBaseUrl = function() {
    var config = new Config();
    return config.staticBase;
};

Config.prototype = {
    // static variable
    staticBase: 'http://localhost:8080/static',

    // instance function
    getEnvironment: function() {
      return this.environment;
    },

    getUrl: function() {
      return concat(this.staticBase, this.url);
    }
};

// make private functions testable
if (process.env.NODE_ENV === 'test') {
  Config.concat = concat;
}

// export as a singleton
module.exports = exports = new Config();
