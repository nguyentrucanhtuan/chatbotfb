// Load the node-router library by creationix
//var server = require('node-router').getServer();
var http = require('http');

// Configure our HTTP server to respond with Hello World the root request
/*server.get("/", function (request, response) {
  response.simpleText(200, "Hello World!");
});
*/

// Listen on port 8080 on localhost
var port = process.env.PORT || 8080;

http.get("/",function(request, response) {
  response.simpleText(200, "Hello World!");
}).listen(port); // Activates this server, listening on port 8080.

//server.listen(port, "localhost");
