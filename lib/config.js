var path 	= require('path'), 
	dir 	= path.resolve(__dirname, '..'), 
	config	= require(path.join(dir, 'package.json')),
	_ 		= require('underscore');

module.exports = function( data ){
	return require('configurable')( _.extend(data, config ) );
};