var db = require('./db');

exports.create = function (req, res) {
	var prova = req.body;
	db.query('insert into prova(Cod_prova, Cod_concurso) values (?, ?)', 
		[ prova.Cod_prova, prova.concurso.Cod_concurso ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(prova);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select p.*, c.* ' +
			'from prova p inner join concurso c on p.Cod_concurso = c.Cod_concurso',
		function (err, rows, close) {
			if (err) { return next(err); }
			var objects = [];
			for (var i = 0; i < rows.length; i++) {
				objects.push({
					Cod_prova: rows[i].Cod_prova,
					concurso: {
						Cod_concurso: rows[i].Cod_concurso
					}
				});
			};
			res.send(objects);
			close();
		}
	);
}

exports.update = function (req, res, next) {
	var prova = req.body;
	var arr = req.params.id.split('+');
	db.query('update prova set Cod_prova = ?, Cod_concurso = ? ' +
			'where Cod_prova = ? and Cod_concurso = ?', 
		[ prova.Cod_prova, prova.concurso.Cod_concurso, arr[0], arr[1] ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(prova);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	var arr = req.params.id.split('+');
	db.query('delete from prova where Cod_prova = ? and Cod_concurso = ?', 
		[ arr[0], arr[1] ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}