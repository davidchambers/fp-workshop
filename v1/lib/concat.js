'use strict';

//  concat :: Semigroup a => a -> a -> a
module.exports = function concat(x) {
  return function(y) {
    return x.concat(y);
  };
};
