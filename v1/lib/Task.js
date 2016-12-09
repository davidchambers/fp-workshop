'use strict';

module.exports = Task;

function Task(fork) {
  if (!(this instanceof Task)) return new Task(fork);
  this.fork = fork;
}

//  Rejected :: a -> Task a b
function Rejected(value) {
  return Task(function(reject, resolve) { reject(value); });
}
Task.Rejected = Rejected;

//  Resolved :: b -> Task a b
function Resolved(value) {
  return Task(function(reject, resolve) { resolve(value); });
}
Task.Resolved = Resolved;

//  Task#map :: Task a b ~> (b -> c) -> Task a c
Task.prototype.map = function Task$prototype$map(f) {
  return TK;
};

//  Task#chain :: Task a b ~> (b -> Task a c) -> Task a c
Task.prototype.chain = function Task$prototype$chain(f) {
  return TK;
};
