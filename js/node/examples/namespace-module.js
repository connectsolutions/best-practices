'use strict';

// private variables
var environment = 'TEST';
var testBase = 'http://localhost:8080/api';
var baseUrl;

// private functions
function getEnvironment() {
  return environment;
};

function getBaseUrl() {
  if (baseUrl) {
    return baseUrl;
  } else if (getEnvironment() === process.env.NODE_ENV) {
    return testBase;
  }
};

// public functions
function getUrl() {
  return getBaseUrl() + '/users';
};

function setBaseUrl(value) {
  baseUrl = value;
};

exports.getUrl = getUrl;
exports.setBaseUrl = setBaseUrl;

if (process.env.NODE_ENV === 'test') {
  exports.getBaseUrl = getBaseUrl;
}
