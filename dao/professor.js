var db = require('./db');

exports.create = function (req, res, next) {
	var professor = req.body;
	db.query('insert into professor(Nome_professor) values (?)', 
		[ professor.Nome_professor ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(professor);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select * from professor', function (err, rows, close) {
		if (err) { return next(err); }
		res.send(rows);
		close();
	});
}

exports.update = function (req, res, next) {
	var professor = req.body;
	db.query('update professor set Nome_professor = ? where Cod_professor = ?', 
		[ professor.Nome_professor, req.params.id ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(professor);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from professor where Cod_professor = ?', 
		[ req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}