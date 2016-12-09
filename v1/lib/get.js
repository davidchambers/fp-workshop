'use strict';

var Result = require('./Result');
var has = require('./has');

//  get :: (Any -> Boolean) -> String -> Object -> Result String a
module.exports = function get(pred) {
  return function(prop) {
    return function(obj) {
      if (!has(prop)(obj)) {
        return Result.Failure('Missing "' + prop + '" field');
      } else if (!pred(obj[prop])) {
        return Result.Failure('Value of "' + prop + '" field is unsatisfactory');
      } else {
        return Result.Success(obj[prop]);
      }
    };
  };
};
