var db = require('./db');

exports.create = function (req, res, next) {
	var areaformacao = req.body;
	db.query('insert into area_formacao(Nome_areaform) values (?)', 
		[ areaformacao.Nome_areaform ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(areaformacao);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select * from area_formacao', function (err, rows, close) {
		if (err) { return next(err); }
		res.send(rows);
		close();
	});
}

exports.update = function (req, res, next) {
	var areaformacao = req.body;
	db.query('update area_formacao set Nome_areaform = ? where Cod_areaform = ?', 
		[ areaformacao.Nome_areaform, req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(areaformacao);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from area_formacao where Cod_areaform = ?', 
		[ req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}