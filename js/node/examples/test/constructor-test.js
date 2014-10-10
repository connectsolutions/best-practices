'use strict';

var expect = require('chai').expect;
var Config = require('../constructor-module');

describe('Constructor Pattern', function(){
  var config;
  before(function(){
    config = new Config();
  });

  describe('When creating a new instance of a config class', function(){
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

  describe('When accessing the static class', function(){
    it('the static function should be accessable on the class', function(){
      expect(Config.getBaseUrl).to.exist;
    });
    it('this static variable should not be accesable', function(){
      expect(Config.staticBase).to.not.exist;
    });
    it('the static baseUrl should contain static', function(){
      expect(Config.getBaseUrl()).to.contain('static');
    });
    it('the private function should be accessable for testing', function(){
      expect(Config.concat).to.exist;
    });
  });

  describe('When creating a second instance', function(){
    var secondConfig;
    before(function(){
      secondConfig = new Config('/index.html');
    });
    it('should not change the value of the the original config', function(){
      expect(config.getUrl()).to.not.contain('index.html');
    });
  });

});
