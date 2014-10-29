'use strict';

var expect = require('chai').expect;
var Config = require('../constructor-module');
var ProductionConfig = require('../subclass-module');

describe('When subClass is created', function(){
  var prodConfig;
  before(function(){
    prodConfig = new ProductionConfig();
  });
  it('should exist', function(){
    expect(prodConfig).to.exist;
  });
  it('should inherit from baseClass',function(){
    expect(prodConfig instanceof Config).to.be.true;
  });
  it('should have the environment set to production', function(){
    expect(prodConfig.getEnvironment()).to.equal('production');
  });
  it('should have new getBaseUrl function', function(){
    expect(prodConfig.getBaseUrl).to.exist;
  });
  it('should have a base url with production', function(){
    expect(prodConfig.getBaseUrl()).to.contain('production');
  });
});
