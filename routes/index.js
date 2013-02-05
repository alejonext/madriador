
/*
 * GET home page.
 */
var lib = require('../lib');

routes = function(data){
	this.db = new lib.db(data.get("db"));
};


index = function(req, res){
  res.render('index', { title: 'Express' });
};

user = function(req, res, next){
	this.db.insertarUsuario(req.body.user, function(err, result){
		if(_.isNull(result) ){
			res.json({ error : err, user : 'delete' });
		} else {
			res.json({ error : err, user : result });
		};
	});
};

madriar = function(req, res, next){
	this.db.insertarMadrazo(req.body.user, function(err, result){
		if(_.isNull(result) ){
			res.json({ error : err, user : 'delete' });
		} else {
			res.json({ error : err, madrazo : result });
		};
	});
};

//Exports
routes.prototype.user = user;
routes.prototype.madriar = madriar;
routes.prototype.index = index;
module.exports = exports = routes;