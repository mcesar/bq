var db = require('./db');

exports.create = function (req, res, next) {
	var questao_professor = req.body;
	db.query('insert into QuestaoProfessor values (?, ?, ?, ?, ?)', 
		[ req.params.questaoId, req.params.provaId, req.params.concursoId,
			questao_professor.professor.Cod_professor,
			questao_professor.comentario ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(questao_professor);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select qp.*, p.Nome_professor ' +
			'from QuestaoProfessor qp inner join professor p on ' + 
					'qp.Cod_professor = p.Cod_professor ' +
			'where Numero_questao = ? and Cod_concurso = ? and Cod_prova = ?',
		[ req.params.questaoId, req.params.concursoId, req.params.provaId ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			var objects = [];
			for (var i = 0; i < rows.length; i++) {
				objects.push({
					questao: {
						Numero_questao: rows[i].Numero_questao,
						Cod_concurso: rows[i].Cod_concurso,
						Cod_prova: rows[i].Cod_prova,
					},
					comentario: rows[i].comentario,
					professor: {
						Cod_professor: rows[i].Cod_professor,
						Nome_professor: rows[i].Nome_professor
					}
				});
			};
			res.send(objects);
			close();
		}
	);
}

exports.update = function (req, res, next) {
	var questao_professor = req.body;
	db.query('update QuestaoProfessor ' +
			'set comentario = ? ' +
			'where Numero_questao = ? and Cod_concurso = ? and ' +
				'Cod_prova = ? and Cod_professor = ?', 
		[ questao_professor.comentario, req.params.questaoId, 
			req.params.concursoId, req.params.provaId, req.params.professorId ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(questao_professor);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from QuestaoProfessor ' +
				'where Numero_questao = ? and Cod_concurso = ? and ' +
					'Cod_prova = ? and Cod_professor = ?', 
		[ req.params.questaoId, req.params.concursoId, req.params.provaId,
			req.params.professorId ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}