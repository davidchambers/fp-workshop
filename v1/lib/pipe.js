'use strict';

//  pipe :: [a -> b, b -> c, ..., m -> n] -> a -> n
module.exports = function pipe(fs) {
  return function(x) {
    return fs.reduce(function(x, f) { return f(x); }, x);
  };
};
