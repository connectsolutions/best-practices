'use strict';

var expect = require('chai').expect;
var config = require('../constructor-module');

describe('Singleton Pattern', function(){

  describe('When accessing the singleton of a config class', function(){
    it('should exist', function(){
      expect(config).to.exist;
    });
    it('should return test as the environment', function(){
      expect(config.getEnvironment()).to.equal('test');
    });
    it('the static function should not be accessable', function(){
      expect(config.getBaseUrl).to.not.exist;
    });
  });

});
