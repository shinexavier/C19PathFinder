var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

require('./dashboard.js')(server);
require('./testing-sites.js')(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
