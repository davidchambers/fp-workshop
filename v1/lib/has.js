'use strict';

//  has :: String -> Object -> Boolean
module.exports = function has(k) {
  return function(o) {
    return Object.prototype.hasOwnProperty.call(o, k);
  };
};
