var db = require('./db');

exports.create = function (req, res, next) {
	var prova = req.body;
	var parameters = [ prova.Cod_prova, prova.concurso.Cod_concurso ];
	var cargos = cargosString(prova, parameters, prova.Cod_prova, 
		prova.concurso.Cod_concurso);
	db.query('insert into prova(Cod_prova, Cod_concurso) values (?, ?);' + 
		cargos, parameters, 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(prova);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	var sql = 'select p.*, c.Data_abertura, c_.Cod_cargo, c_.Nome_cargo ' +
			'from prova p left outer join ' +
				'concurso c on p.Cod_concurso = c.Cod_concurso left outer join ' +
				'CargoProva cp on p.Cod_prova = cp.Cod_prova and ' +
					'p.Cod_concurso = cp.Cod_concurso left outer join ' + 
				'cargo c_ on cp.Cod_cargo = c_.Cod_cargo ' +
			'where p.Cod_concurso = ?';
	var params = [ req.params.concursoId ];
	if (typeof req.params.provaId !== 'undefined') {
		sql += ' and p.Cod_concurso = ?';
		params.push(req.params.provaId);
	}
	db.query(sql, params, function (err, rows, close) {
		if (err) { return next(err); }
		var objects = [], obj, mapa = {};
		for (var i = 0; i < rows.length; i++) {
			obj = mapa[rows[i].Cod_prova + '|' + rows[i].Cod_concurso];
			if (typeof obj == 'undefined') {
				obj = {
					Cod_prova: rows[i].Cod_prova,
					concurso: {
						Cod_concurso: rows[i].Cod_concurso,
						Data_abertura: rows[i].Data_abertura,
					},
					cargos: []
				};
				objects.push(obj);
				mapa[obj.Cod_prova + '|' + obj.Cod_concurso] = obj;
			}
			if (typeof rows[i].Cod_cargo !== 'undefined' 
						&& rows[i].Cod_cargo != null) {
				obj.cargos.push({ 
					Cod_cargo: rows[i].Cod_cargo, 
					Nome_cargo: rows[i].Nome_cargo
				});					
			}
		};
		res.send(objects);
		close();
	});
}

exports.update = function (req, res, next) {
	var prova = req.body;
	var arr = [ req.params.provaId, req.params.concursoId ];
	var parameters = [ arr[0], arr[1], 
					prova.Cod_prova, prova.concurso.Cod_concurso, arr[0], arr[1]];
	var cargos = cargosString(prova, parameters, prova.Cod_prova, 
		prova.concurso.Cod_concurso);
	db.query('delete from CargoProva where Cod_prova = ? and Cod_concurso = ?;' +
		'update prova set Cod_prova = ?, Cod_concurso = ? ' +
			'where Cod_prova = ? and Cod_concurso = ?;' + cargos, 
		parameters, 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(prova);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	var arr = [ req.params.provaId, req.params.concursoId ];
	db.query('delete from CargoProva where Cod_prova = ? and Cod_concurso = ?;' +
			'delete from prova where Cod_prova = ? and Cod_concurso = ?', 
		[ arr[0], arr[1], arr[0], arr[1] ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}

function cargosString (prova, parameters, provaId, concursoId) {
	var cargos = '';
	if (typeof prova.cargos !== 'undefined') {
		for (var i = 0; i < prova.cargos.length; i++) {
			cargos += 'insert into CargoProva values (?, ?, ?);';
			parameters.push(prova.cargos[i].Cod_cargo, provaId, concursoId);
		}		
	}
	return cargos;
}