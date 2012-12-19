
/*
 * GET home page.
 */
var lib = require('../lib');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.user = function(req, res, next){
	lib.db.insertarUsuario(req.body.user, function(err, result){
		if(_.isNull(result) ){
			res.json({ error : err, user : 'delete' });
		} else {
			res.json({ error : err, user : result });
		};
	});
};

exports.madriar = function(req, res, next){
	lib.db.insertarMadrazo(req.body.user, function(err, result){
		if(_.isNull(result) ){
			res.json({ error : err, user : 'delete' });
		} else {
			res.json({ error : err, madrazo : result });
		};
	});
};