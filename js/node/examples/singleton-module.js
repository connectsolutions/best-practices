'use strict';

// constructor
function Config(){
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

// static variable
Config.prototype.staticBase = 'http://localhost:8080/static',

// instance function
Config.prototype.getEnvironment = function() {
  return this.environment;
}

Config.prototype.getUrl = function() {
  return concat(this.staticBase, this.url);
}

// make private functions testable
if (process.env.NODE_ENV === 'test') {
  Config.concat = concat;
}

// export as a singleton
module.exports = exports = new Config();
