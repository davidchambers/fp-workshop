'use strict';

var Z = require('sanctuary-type-classes');

var Result = module.exports = {};

function _Result(tag, value) {
  this.isFailure = tag === 'Failure';
  this.isSuccess = tag === 'Success';
  this.value = value;
}

//  Failure :: a -> Result a b
function Failure(value) {
  return new _Result('Failure', value);
}
Result.Failure = Failure;

//  Success :: b -> Result a b
function Success(value) {
  return new _Result('Success', value);
}
Result.Success = Success;

//  Result.fold :: (a -> c) -> (b -> c) -> Result a b -> c
Result.fold = function(f) {
  return function(g) {
    return function(result) {
      return result.isFailure ? f(result.value) : g(result.value);
    };
  };
};

//  Result#map :: Result a b ~> (b -> c) -> Result a c
//
//  > Failure('Request failed').map(Math.sqrt)
//  Failure('Request failed')
//
//  > Success(64).map(Math.sqrt)
//  Success(8)
_Result.prototype.map = function(f) {
  return this.isFailure ? this : Success(f(this.value));
};

//  Result#chain :: Result a b ~> (b -> Result a c) -> Result a c
//
//  > var sqrt = x => x < 0 ? Failure('Cannot sqrt negative number') : Success(Math.sqrt(x))
//
//  > Failure('Request failed').chain(sqrt)
//  Failure('Request failed')
//
//  > Success(-100).chain(sqrt)
//  Failure('Cannot sqrt negative number')
//
//  > Success(64).chain(sqrt)
//  Success(8)
_Result.prototype.chain = function(f) {
  return this.isFailure ? this : f(this.value);
};

_Result.prototype.inspect =
_Result.prototype.toString = function() {
  return (this.isFailure ? 'Failure' : 'Success') +
         '(' + Z.toString(this.value) + ')';
};
