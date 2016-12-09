'use strict';

var assert = require('assert');

var Z = require('sanctuary-type-classes');

if (!Object.prototype.hasOwnProperty.call(process.env, 'PORT')) {
  process.stderr.write('No environment variable named "PORT"\n');
  process.exit(1);
}
//  PORT :: Number
var PORT = Number(process.env.PORT);

var v0 = require('../v0/app')({hostname: '127.0.0.1', port: PORT});
var v1 = require('../v1/app')({hostname: '127.0.0.1', port: PORT});


function eq(actual, expected) {
  assert.strictEqual(arguments.length, eq.length);
  assert.strictEqual(Z.toString(actual), Z.toString(expected));
  assert.strictEqual(Z.equals(actual, expected), true);
}

//  fail :: String -> Undefined !
function fail(message) {
  assert.fail(null, null, message);
}

var expectedResults = {
  1001: {successful: false, value: 'Internal Server Error'},
  1002: {successful: false, value: 'Unexpected end of JSON input'},
  1003: {successful: false, value: 'Unsatisfactory JSON string'},
  1004: {successful: false, value: 'Missing "address" field'},
  1005: {successful: false, value: 'Value of "address" field is unsatisfactory'},
  1006: {successful: false, value: 'Missing "country" field'},
  1007: {successful: false, value: 'Value of "country" field is unsatisfactory'},
  9999: {successful: true, value: 'Germany'}
};

suite('v0', function() {
  Object.keys(expectedResults).sort().forEach(function(id) {
    var exp = expectedResults[id];
    test(id, function(done) {
      v0(id).then(
        function success(x) {
          setTimeout(function() {
            if (exp.successful) eq(x, exp.value);
            else                fail('Expected rejected promise but received resolved promise');
            done();
          }, 0);
        },
        function failure(x) {
          setTimeout(function() {
            if (exp.successful) fail('Expected resolved promise but received rejected promise');
            else                eq(x, exp.value);
            done();
          }, 0);
        }
      );
    });
  });
});

suite('v1', function() {
  Object.keys(expectedResults).sort().forEach(function(id) {
    var exp = expectedResults[id];
    test(id, function(done) {
      v1(id).fork(
        function failure(x) {
          if (exp.successful) fail('Expected resolved task but received rejected task');
          else                eq(x, exp.value);
          done();
        },
        function success(x) {
          if (exp.successful) eq(x, exp.value);
          else                fail('Expected rejected task but received resolved task');
          done();
        }
      );
    });
  });
});
