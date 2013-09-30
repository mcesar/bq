var db = require('./db');

exports.create = function (req, res, next) {
	var concurso = req.body;
	var cargos = '';
	var parameters =
		[ concurso.Data_abertura, concurso.banca.Cod_banca, 
			concurso.orgao.Cod_orgao ];
	if (typeof concurso.cargos !== 'undefined') {
		for (var i = 0; i < concurso.cargos.length; i++) {
			cargos += 'insert into ConcursoCargo values (last_insert_id(), ?);';
			parameters.push(concurso.cargos[i].Cod_cargo);
		}		
	}
	db.query('insert into concurso(Data_abertura, Cod_banca, Cod_orgao) ' +
			'values (?, ?, ?);' + cargos, parameters, 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(concurso);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select c.*, b.*, o.*, c_.Cod_cargo, c_.Nome_cargo ' +
			'from concurso c left outer join ' +
				'banca b on c.Cod_banca = b.Cod_banca left outer join ' +
				'orgao o on c.Cod_orgao = o.Cod_orgao left outer join ' +
				'ConcursoCargo cc on c.Cod_concurso = cc.Cod_concurso ' +
					'left outer join cargo c_ on cc.Cod_cargo = c_.Cod_cargo',
		function (err, rows, close) {
			if (err) { return next(err); }
			var objects = [], obj, mapa = {};
			for (var i = 0; i < rows.length; i++) {
				obj = mapa[rows[i].Cod_concurso];
				if (typeof obj == 'undefined') {					
					obj = {
						Cod_concurso: rows[i].Cod_concurso,
						Data_abertura: rows[i].Data_abertura,
						banca: {
							Cod_banca: rows[i].Cod_banca,
							Nome_banca: rows[i].Nome_banca
						},
						orgao: {
							Cod_orgao: rows[i].Cod_orgao,
							Nome_orgao: rows[i].Nome_orgao
						},
						cargos: []
					};
					objects.push(obj);
					mapa[obj.Cod_concurso] = obj;
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
		}
	);
}

exports.update = function (req, res, next) {
	var concurso = req.body;
	db.query('update concurso ' +
			'set Data_abertura = ?, Cod_banca = ?, Cod_orgao = ? ' +
			'where Cod_concurso = ?', 
		[ concurso.Data_abertura, concurso.banca.Cod_banca, 
				concurso.orgao.Cod_orgao, req.params.id ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(concurso);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from ConcursoCargo where Cod_concurso = ?; ' +
			'delete from concurso where Cod_concurso = ?', 
		[ req.params.id, req.params.id ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}