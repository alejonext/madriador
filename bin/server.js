/*
* Servidor Web
*/
var express = require('express'), 
	routes = require('../routes'), 
	path = require('path');

var app = express();

module.exports = function(data){
	app.configure(function() {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.favicon());
		app.use(express.logger(data.get("status").substring(3)));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser(data.get("pass")));
		app.use(express.session());
		app.use(app.router);
		app.use(require('less-middleware')({
			src : __dirname + '/public'
		}));
		app.use(express.static(path.join(__dirname, 'public')));
	});
	route = new routes(data);
	app.configure(data.get("status"), function() {
		app.use(express.errorHandler());
	});
	app.get('/', route.index);
	app.post('/user', route.user);
	app.post('/madr', route.madriar);
	return app;
} ;