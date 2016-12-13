'use strict';

var assoc           = require('./lib/assoc');
var chain           = require('./lib/chain');
var concat          = require('./lib/concat');
var get             = require('./lib/get');
var isAccessible    = require('./lib/isAccessible');
var isString        = require('./lib/isString');
var map             = require('./lib/map');
var merge           = require('./lib/merge');
var parseJson       = require('./lib/parseJson');
var pipe            = require('./lib/pipe');
var request         = require('./lib/request');
var resultToTask    = require('./lib/resultToTask');
var singleton       = require('./lib/singleton');


//  countryFromResponseBody :: String -> Result String String
var countryFromResponseBody =
pipe([parseJson(isAccessible),              // Result String Accessible
      chain(get(isAccessible)('address')),  // Result String Accessible
      chain(get(isString)('country'))]);    // Result String String

//  v1 :: Object -> String -> Task String String
module.exports = function(options) {
  return pipe([
    concat('/users/'),              // :: String
    singleton('path'),              // :: { path :: String }
    merge(options),                 // :: { path :: String, hostname :: String, port :: Number }
    assoc('method')('GET'),         // :: { path :: String, hostname :: String, port :: Number, method :: String }
    request,                        // :: Task String String
    map(countryFromResponseBody),   // :: Task String (Result String String)
    chain(resultToTask)             // :: Task String String
  ]);
};
