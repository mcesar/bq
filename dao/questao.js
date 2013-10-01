var db = require('./db');

exports.create = function (req, res, next) {
	var questao = req.body;
	db.query('insert into questao values (?, ?, ?, ?, ?)', 
		[ questao.Numero_questao, req.params.concursoId,
			req.params.provaId, questao.disciplina.Cod_disciplina,
			questao.Descricao_q ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(questao);
			close();
		}
	);
}

exports.read = function (req, res, next) {
	db.query('select q.*, d.Nome_disciplina ' +
			'from questao q inner join disciplina d on ' + 
					'q.Cod_disciplina = d.Cod_disciplina ' +
			'where Cod_concurso = ? and Cod_prova = ?',
		[ req.params.concursoId, req.params.provaId ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			var objects = [];
			for (var i = 0; i < rows.length; i++) {
				objects.push({
					Numero_questao: rows[i].Numero_questao,
					Cod_concurso: rows[i].Cod_concurso,
					Cod_prova: rows[i].Cod_prova,
					Descricao_q: rows[i].Descricao_q,
					disciplina: {
						Cod_disciplina: rows[i].Cod_disciplina,
						Nome_disciplina: rows[i].Nome_disciplina
					}
				});
			};
			res.send(objects);
			close();
		}
	);
}

exports.update = function (req, res, next) {
	var questao = req.body;
	db.query('update questao ' +
			'set Numero_questao = ?, Descricao_q = ? ' +
			'where Numero_questao = ? and Cod_concurso = ? and Cod_prova = ?', 
		[ questao.Numero_questao, questao.Descricao_q, 
			req.params.questaoId, req.params.concursoId, req.params.provaId ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send(questao);
			close();
		}
	);
}

exports.delete = function (req, res, next) {
	db.query('delete from QuestaoProfessor ' +
				'where Numero_questao = ? and Cod_concurso = ? and Cod_prova = ?;' + 
			'delete from questao ' +
				'where Numero_questao = ? and Cod_concurso = ? and Cod_prova = ?', 
		[ req.params.questaoId, req.params.concursoId, req.params.provaId,
			req.params.questaoId, req.params.concursoId, req.params.provaId ], 
		function (err, rows, close) {
			if (err) { return next(err); }
			res.send('');
			close();
		}
	);
}