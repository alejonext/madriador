var Twit= require('twit'), 
	tuitter = require('ntwitter');
	_ 	= require('underscore'),
	db 	= require('./db.js'),
	lib = require('./all.js'),
	T	= new Twit( require('../package.json').twitter ),
	twit = new tuitter( require('../package.json').twitter );

module.exports = {
	index : function(seg) {
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
	stream : function() {
		var stream = T.stream('statuses/filter', { track: 'madriador' });
		stream.on('tweet', function (data) {
			if( !data.retweeted && data.retweet_count <= 0 ){
				tuit = _.extend(data, lib.find( data ) );
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