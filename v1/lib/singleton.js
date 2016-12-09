'use strict';

//  singleton :: String -> a -> StrMap a
module.exports = function singleton(k) {
  return function(v) {
    var o = {};
    o[k] = v;
    return o;
  };
};
