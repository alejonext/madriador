/**
 * @author Alejandro
 */

var _		= require('underscore'),
	mongo	= require('mongoose'),
	path 	= require('path'), 
	lib 	= require('./all.js'),
	dir 	= path.resolve(__dirname, '..'), 
	config 	= require(path.join(dir, 'package.json')), 
	db 		= mongo.createConnection( lib.urlServer( config.db ) );

var Schema	= mongo.Schema,
	ObjectId= Schema.Types.ObjectId;


var madrazo = Schema({
	insulto : {
		type : [ String ],
		trim : true
	},
	idioma : {
		type : String,
		trim : true
	},
});
var usuario = Schema({
	usuario : {
		type : String,
		trim : true
	},
	idioma : {
		type : String,
		trim : true
	}
});
madrazo.path('insulto').validate( _.isArray, 'format');
madrazo.path('idioma').validate(_.isString, 'format');
usuario.path('usuario').validate(_.isString, 'format');
usuario.path('idioma').validate(_.isString, 'format');
usuarios = db.model('usuario', usuario);
madriar = db.model('madrazo', madrazo);

module.exports = {

	insertarMadrazo : function(data, callback) {
		obj = new madriar({
			insulto : data.madrazo,
			idioma : 'es'
		});
		return obj.save(callback);
	},

	insertarUsuario : function(data, callback) {
		esto = new Array();
		for(var i=0,j=data.usuarios.length; i<j; i++){ 
			doc = new usuarios({
				usuario : data.usuarios[i]
			});
			doc.save(function(err) {
				esto.push(err);
			});
		};
		return callback( _.compact(esto) );
	},

	eliminarUsuario : function(data, callback) {
		uesto = new Array;
		for(var i=0,j=data.users.length; i<j; i++){ 
			usuarios.findOneAndRemove({
				usuario : data.usuarios[i]
			}, function(err) {
				uesto.push(err);
			});
		};
		return callback( _.compact( uesto ) );
	},

	Quienes : function(callback) {
		return usuarios.find( callback );
	},

	madrazo : function( who, callback ) {
		return madriar.find(function(err, docs) {
			if( docs.length  > 0){
				temlp = "<%= usuario%> " + _.shuffle( docs )[0].insulto.join(' ');
				return callback(err, who ? _.template( temlp, who) : false );
			} else {
				return callback(err, false);
			}
			
		});
	}
};
