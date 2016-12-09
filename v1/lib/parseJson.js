'use strict';

var Result = require('./Result');

//  parseJson :: (Any -> Boolean) -> String -> Result String a
module.exports = function parseJson(pred) {
  return function(s) {
    var result;
    try {
      result = JSON.parse(s);
    } catch (err) {
      return Result.Failure(err.message.replace(/^Unexpected end of input$/, 'Unexpected end of JSON input'));
    }
    if (!pred(result)) {
      return Result.Failure('Unsatisfactory JSON string');
    } else {
      return Result.Success(result);
    }
  };
};
