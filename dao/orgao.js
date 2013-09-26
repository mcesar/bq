var db = require('./db');

exports.create = function (req, res, next) {
	var orgao = req.body;
	db.query('insert into orgao values (?, ?)', 
		[ orgao.Cod_orgao, orgao.Nome_orgao], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(orgao);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select * from orgao', function (err, rows, close) {
		if (err) { return next(err); }
		res.send(rows);
		close();
	});
}

exports.update = function (req, res, next) {
	var orgao = req.body;
	db.query('update orgao set Cod_orgao = ?, Nome_orgao = ? where Cod_orgao = ?', 
		[ orgao.Cod_orgao, orgao.Nome_orgao, req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(orgao);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from orgao where Cod_orgao = ?', 
		[ req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}