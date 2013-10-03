var db = require('./db');

exports.create = function (req, res, next) {
	var disciplina = req.body;
	db.query('insert into disciplina(Nome_disciplina) values (?)', 
		[ disciplina.Nome_disciplina], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(disciplina);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select * from disciplina', function (err, rows, close) {
		if (err) { return next(err); }
		res.send(rows);
		close();
	});
}

exports.update = function (req, res, next) {
	var disciplina = req.body;
	db.query('update disciplina set Nome_disciplina = ? where Cod_disciplina = ?', 
		[ disciplina.Nome_disciplina, req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(disciplina);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from disciplina where Cod_disciplina = ?', 
		[ req.params.id], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}