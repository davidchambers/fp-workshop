'use strict';

//  chain :: Chain m => (a -> m b) -> m a -> m b
module.exports = function chain(f) {
  return function(chain) {
    return chain.chain(f);
  };
};
