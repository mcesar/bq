var db = require('./db');

exports.create = function (req, res) {
	res.send([ { a: 'a' } ]);
}

exports.read = function (req, res, next) {
	db.query('select * from banca', function (err, rows, close) {
		if (err) { return next(err); }
		var arr = [];
		for (var i = 0; i < rows.length; i++) {
			arr.push({ 
				codigo: rows[i].Cod_banca,
				nome: rows[i].Nome_banca 
			});
		};
		res.send(arr);
		close();
	});
}

exports.update = function (req, res) {
	res.send([ { a: 'a' } ]);
}

exports.delete = function (req, res) {
	res.send([ { a: 'a' } ]);
}