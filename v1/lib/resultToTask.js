'use strict';

var Result = require('./Result');
var Task = require('./Task');

//  resultToTask :: Result a b -> Task a b
module.exports = Result.fold(Task.Rejected)(Task.Resolved);
