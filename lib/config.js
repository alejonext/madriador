var path 	= require('path'), 
	dir 	= path.resolve(__dirname, '..'), 
	z		= require(path.join(dir, 'package.json')),
	_ 		= require('underscore');

module.exports = function( data ){
	config =_.extend({ 	
		twitter : {
			consumer_key : "YourKey",
			consumer_secret : "YourKeyScret",
			access_token : "TheToken",
			access_token_secret : "TokenSecret"
			},
		db : {
			host : "localhost",
			path : "madrazos",
			type : "mongodb",
			port : 27017
		},
		insulto : "insulto",
		dejar : "dejardemadriarme",
		madriar : "madrear",
		user : "madriador",
		me : "alejonext",
		tag : "madriador",
		coleccion : {
			usuario : "usuarios",
			madrazo : "madrazos"
		} }, z);
	return require('configurable')( _.extend(data, config ) );
};