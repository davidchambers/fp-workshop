'use strict';

var http = require('http');
var url = require('url');


var server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  var match = url.parse(req.url).pathname.match(/^[/]users[/](\d+)$/);
  if (match == null) {
    res.writeHead(404);
  } else if (match[1] === '1001') {
    res.writeHead(500);
  } else if (match[1] === '1002') {
    res.writeHead(200);
    res.write('{\n');  // invalid JSON response
  } else if (match[1] === '1003') {
    res.writeHead(200);
    res.write('null\n');  // valid but unhelpful JSON response
  } else if (match[1] === '1004') {
    res.writeHead(200);
    res.write('{}\n');  // missing "address" field
  } else if (match[1] === '1005') {
    res.writeHead(200);
    res.write('{"address":null}\n');  // unhelpful "address" value
  } else if (match[1] === '1006') {
    res.writeHead(200);
    res.write('{"address":{}}\n');  // missing "country" field
  } else if (match[1] === '1007') {
    res.writeHead(200);
    res.write('{"address":{"country":null}}\n');  // unhelpful "country" value
  } else if (match[1] === '9999') {
    res.writeHead(200);
    res.write(JSON.stringify({id: match[1], username: 'alice', address: {city: 'Munich', country: 'Germany'}}) + '\n');
  } else {
    res.writeHead(404);
  }

  res.end();
});

server.on('listening', function() {
  var addr = server.address();
  process.stderr.write(
    'Server listening at http://' + addr.address + ':' + addr.port + '\n'
  );
});

server.listen(0, '127.0.0.1');
