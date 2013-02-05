/**
 * @author Alejandro
 */

var _		= require('underscore'),
	mongo	= require('mongoose'),
	path 	= require('path'), 
	lib 	= require('./all.js'),
	dir 	= path.resolve(__dirname, '..'), 
	config 	= require(path.join(dir, 'package.json')), 
	

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

db = function(config){
	connet 		= mongo.createConnection( lib.urlServer( config.get("db") ) );
	this.usuarios = connet.model(config.get("coleccion").usuario, usuario);
	this.madriar = connet.model(config.get("coleccion").madrazo, madrazo);
};

insertarMadrazo = function(data, callback) {
	obj = new this.madriar({
		insulto : data.madrazo,
		idioma : 'es'
	});
	return obj.save(callback);
};
insertarUsuario = function(data, callback) {
		esto = new Array();
		for(var i=0,j=data.usuarios.length; i<j; i++){ 
			doc = new this.usuarios({
				usuario : data.usuarios[i]
			});
			doc.save(function(err) {
				esto.push(err);
			});
		};
		return callback( _.compact(esto) );
	};
eliminarUsuario = function(data, callback) {
		uesto = new Array;
		for(var i=0,j=data.users.length; i<j; i++){ 
			this.usuarios.findOneAndRemove({
				usuario : data.usuarios[i]
			}, function(err) {
				uesto.push(err);
			});
		};
		return callback( _.compact( uesto ) );
	};
Quienes = function(callback) {
		return this.usuarios.find( callback );
	};

madrazo = function( who, callback ) {
		return this.madriar.find(function(err, docs) {
			if( docs.length  > 0 ||  !err ){
				temlp = "<%= usuario%> " + _.shuffle( docs )[0].insulto.join(' ');
				return callback(err, who ? _.template( temlp, who) : false );
			} else {
				return callback(err, false);
			}
			
		});
	};

//Exports
db.prototype.insertarMadrazo = insertarMadrazo;
db.prototype.insertarUsuario = insertarUsuario;
db.prototype.Quienes = Quienes;
db.prototype.madrazo = madrazo;
module.exports = exports = db;