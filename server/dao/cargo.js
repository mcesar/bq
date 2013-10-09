var db = require('./db');

exports.create = function (req, res, next) {
	var cargo = req.body;
	db.query(
		'insert into cargo(Nome_cargo, Cod_areaformacao, Cod_areaatuacao) ' +
		'values (?, ?, ?)', 
		[ cargo.Nome_cargo, cargo.area_formacao.Cod_areaform,
			cargo.area_atuacao.Cod_areaatuacao ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(cargo);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	var sql = 'select c.*, af.*, aa.* ' +
			'from cargo c left outer join area_formacao af on ' +
					'c.Cod_areaformacao = af.Cod_areaform ' +
				'left outer join area_atuacao aa on ' + 
					'c.Cod_areaatuacao = aa.Cod_areaatuacao';
	var params = [];
	if (typeof req.params.id !== 'undefined') { 
		sql += ' where Cod_cargo = ?';
		params.push(req.params.id);
	}
	db.query(sql, params, function (err, rows, close) {
		if (err) { return next(err); }
		var objects = [];
		for (var i = 0; i < rows.length; i++) {
			objects.push({
				Cod_cargo: rows[i].Cod_cargo,
				Nome_cargo: rows[i].Nome_cargo,
				area_formacao: {
					Cod_areaform: rows[i].Cod_areaform,
					Nome_areaform: rows[i].Nome_areaform
				},
				area_atuacao: {
					Cod_areaatuacao: rows[i].Cod_areaatuacao,
					Nome_areaatuacao: rows[i].Nome_areaatuacao
				}
			});
		};
		res.send(objects);
		close();
	});
}

exports.update = function (req, res, next) {
	var cargo = req.body;
	db.query('update cargo set Nome_cargo = ?, Cod_areaformacao = ?, ' +
			'Cod_areaatuacao = ? where Cod_cargo = ?', 
		[ cargo.Nome_cargo, cargo.area_formacao.Cod_areaform, 
			cargo.area_atuacao.Cod_areaatuacao, req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(cargo);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from cargo where Cod_cargo = ?', 
		[ req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}