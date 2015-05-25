var http = require('http');
var urlParser = require('url');

var port = 3000;
var ip = "127.0.0.1";

var server = http.createServer(function(request, response){
	var urlParts  =  urlParser.parse(request.url);
	var route = routes[urlParts.pathname];
	if(route){
		route(request, response);
	}else{
		sendResponse(response, "Not found", 404);
	}

});

var headers = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
	"access-control-allow-headers": "content-type, accept",
	"access-control-max-age": 10, // Seconds.
	"Content-Type": "application/json"
}

var routes = {
	'/' : function(request, response){
		var action = actions[request.method];

		if(action){
			action(request, response);
		}else {
			sendResponse(response, "Not found", 404);
		}
		

	},
	'/hola' : function(request, response){
		var action = actions[request.method];
		if(action){
			action(request, response);

		}else {
			sendResponse(response, "Not found", 404);
		}
	}
}

var sendResponse = function(response, data, statusCode){
	statusCode = statusCode || 200;
	response.writeHead(200, headers);
	response.end(JSON.stringify(data));
}


console.log('se esta escuchando en ' + ip + ":"+ port);



var actions = {
	"GET" : function(request, response){
		console.log('Quiere GET');
		response.end('Se acaba de hacer un get! ;)');
	},
	"POST" : function(request, response){
		console.log("quiere POST");
		response.end('Se acaba de hacer un POST! ;)');
	},
	"OPTIONS" : function(request, response){
		console.log("Quiere Options")
		response.end('Se acaba de hacer un options! ;)');
	}
}


server.listen(port, ip);


