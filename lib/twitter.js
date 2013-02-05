var Twit= require('twit'), 
	tuitter = require('ntwitter');
	_ 	= require('underscore'),
	db 	= require('./db.js'),
	lib = require('./all.js');

module.exports = {
	index : function( config ) {
		T	= new Twit( config.get("twuiter") ),
		twit = new tuitter( config.get("twuiter") );
		db.Quienes(function(err, docs) {
			db.madrazo( _.shuffle( docs )[0], function(err, text){
				if(!err && _.isString( text ) ){
					twit
						.verifyCredentials( lib.console )
						.updateStatus(text, lib.console );
				} else {
					lib.console(err, text);
				};
			});
		});
	},
	stream : function( config ) {
		var T	= new Twit( config.get("twuiter") ),
		 stream = T.stream('statuses/filter', { track: config.get("tag") });
		stream.on('tweet', function (data) {
			if( !data.retweeted && data.retweet_count <= 0 ){
				tuit = _.extend(data, lib.find( data, config ) );
				switch ( tuit.tipo ) {
					case 1:
						db.insertarMadrazo( tuit, lib.console );
						break;
					case 2:
						db.eliminarUsuario( tuit, lib.console );
						break;
					case 3:
						db.insertarUsuario( tuit, lib.console );
						break;
					default:
						break;
				};
			};
		});
	}
}; 