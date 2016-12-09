'use strict';

//  map :: Functor f => (a -> b) -> f a -> f b
module.exports = function map(f) {
  return function(functor) {
    return functor.map(f);
  };
};
