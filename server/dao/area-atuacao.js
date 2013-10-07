var db = require('./db');

exports.create = function (req, res, next) {
	var areaatuacao = req.body;
	db.query('insert into area_atuacao(Nome_areaatuacao) values (?)', 
		[ areaatuacao.Nome_areaatuacao ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(areaatuacao);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	var sql = 'select * from area_atuacao';
	var params = [];
	if (typeof req.params.id !== 'undefined') { 
		sql += ' where Cod_areaatuacao = ?';
		params.push(req.params.id);
	}
	db.query(sql, params, function (err, rows, close) {
		if (err) { return next(err); }
		res.send(rows);
		close();
	});
}

exports.update = function (req, res, next) {
	var areaatuacao = req.body;
	db.query('update area_atuacao set Nome_areaatuacao = ? ' + 
			'where Cod_areaatuacao = ?', 
		[ areaatuacao.Nome_areaatuacao, req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(areaatuacao);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from area_atuacao where Cod_areaatuacao = ?', 
		[ req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}