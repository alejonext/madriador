/**
 * @author Alejandro
 */

var _ = require('underscore');
module.exports = {

	find : function(data, config ) {
		list = new Array(),
		number = 0,
		tuit = new Array();
		_.each( data.entities.user_mentions, functioninsulto {
			list.push( '@' + num.screen_name.toLowerCase() );
		});
		_.each( data.text.split(' '), function(num) {
			if( num.substring(0,1) != "#" || num.substring(0,1) != "@" )
				tuit.push( num.toLowerCase() );
		});
		return {
			tipo : _.find( data.entities.hashtags, function(num) {
				return num.text.toLowerCase() == config.get("insulto");
			}) ? 1 : _.find(data.entities.hashtags, function(num) {
				return num.text.toLowerCase() == config.get("dejar") ;
			}) ? 2 : _.find(data.entities.hashtags, function(num) {
				return num.text.toLowerCase() == config.get("madriar");
			}) ? 3 : 0,
			madrazo : _.map( _.difference( tuit, 
				[config.get("user"), "#" + config.get("madriar"), "#" + config.get("dejar"), "#" + config.get("insulto")]), function(num){
				if( number < 120 ){
					number = number + num.length;
					return num;
				};
			} ),
			usuarios : _.difference( list, ["@" + config.get("user"), config.get("me") ] ),
		};
	},

	console : function(x, y, z) {
		if (_.isArray(x) ? x.lenght > 0 : x) {
			w = new Date().toString();
			if (_.isArray(x)) {
				for (var i = 0, j = x.length; i < j; i++)
					x += ' -- ' + x[i];
			} else {
				w += ' -- ' + x;
			};
			if (y)
				w += ' -- ' + y;
			if (z)
				w += ' -- ' + y;
			console.log(w);
		}
	},

	urlServer : function(obj) {
		url = obj.type ? obj.type + '://' : 'http://', 
		url += obj.user ? obj.user + ':' : '', 
		url += obj.pass ? obj.pass + '@' : '', 
		url += obj.host ? obj.host : 'localhost', 
		url += obj.port == 80 || !obj.port ? '' : ':' + obj.port, 
		url += obj.path ? '/' + obj.path : '/';
		return url;
	},
};

