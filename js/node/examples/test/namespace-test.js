'use strict';

var expect = require('chai').expect;
var libModule = require('../namespace-module');
var secondModule = require('../namespace-module');

describe('Namespace Module Pattern', function(){
  describe('When accessing the module', function(){
    it('the exported function should be available', function(){
      expect(libModule.getUrl).to.exist;
    });
    it('the private function should not be available', function(){
      expect(libModule.getEnvironment).to.not.exist;
    });
    it('the testable private function should be available', function(){
      expect(libModule.getBaseUrl).to.exist;
    });
  });
  describe('When setting the base url', function(){
    before(function(){
      libModule.setBaseUrl('http://dev.api.com');
    });
    it('should return the new value', function(){
      expect(libModule.getBaseUrl()).to.contain('dev.');
    });
    // notice how our secondModule is changed by changing the libModule
    // proving that the module definition is not an instance of a module
    it('should return the new value from the secondModule', function(){
      expect(secondModule.getBaseUrl()).to.contain('dev.');
    });
  });
});
