'use strict';

//  merge :: Object -> Object -> Object
module.exports = function merge(x) {
  return function(y) {
    return Object.assign({}, x, y);
  };
};
