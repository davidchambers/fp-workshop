'use strict';

var has = require('./lib/has');
var merge = require('./lib/merge');
var request = require('./lib/request');


//    v0 :: Object -> String -> Promise String String
module.exports = function(options) {
  return function(id) {
    return request(merge(options)({method: 'GET', path: '/users/' + id}))
    .then(function(body) {
      var user;
      try {
        user = JSON.parse(body);
      } catch (err) {
        return Promise.reject(err.message.replace(/^Unexpected end of input$/, 'Unexpected end of JSON input'));
      }
      return Promise.resolve(user);
    })
    .then(function(user) {
      if (user == null) {
        return Promise.reject('Unsatisfactory JSON string');
      } else {
        return Promise.resolve(user);
      }
    })
    .then(function(user) {
      if (!has('address')(user)) {
        return Promise.reject('Missing "address" field');
      } else {
        return Promise.resolve(user.address);
      }
    })
    .then(function(address) {
      if (address == null) {
        return Promise.reject('Value of "address" field is unsatisfactory');
      } else {
        return Promise.resolve(address);
      }
    })
    .then(function(address) {
      if (!has('country')(address)) {
        return Promise.reject('Missing "country" field');
      } else {
        return Promise.resolve(address.country);
      }
    })
    .then(function(country) {
      if (typeof country !== 'string') {
        return Promise.reject('Value of "country" field is unsatisfactory');
      } else {
        return Promise.resolve(country);
      }
    });
  };
};
