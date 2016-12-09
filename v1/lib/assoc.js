'use strict';

var merge = require('./merge');
var singleton = require('./singleton');

//  assoc :: String -> a -> Object -> Object
module.exports = function assoc(k) {
  return function(v) {
    return function(o) {
      return merge(o)(singleton(k)(v));
    };
  };
};
