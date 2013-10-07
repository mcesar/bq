var db = require('./db');

exports.create = function (req, res, next) {
	var banca = req.body;
	db.query('insert into banca values (?, ?)', 
		[ banca.Cod_banca, banca.Nome_banca], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(banca);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	var sql = 'select * from banca';
	var params = [];
	if (typeof req.params.id !== 'undefined') { 
		sql += ' where Cod_banca = ?';
		params.push(req.params.id);
	}
	db.query(sql, params, function (err, rows, close) {	
		if (err) { return next(err); }
		res.send(rows);
		close();
	});
}

exports.update = function (req, res, next) {
	var banca = req.body;
	db.query('update banca set Cod_banca = ?, Nome_banca = ? where Cod_banca = ?', 
		[ banca.Cod_banca, banca.Nome_banca, req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(banca);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from banca where Cod_banca = ?', 
		[ req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}