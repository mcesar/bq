var http = require('http');
var https = require('https');
var express = require('express');

var banca = require('./dao/banca');
var orgao = require('./dao/orgao');
var area_formacao = require('./dao/area-formacao');
var area_atuacao = require('./dao/area-atuacao');
var disciplina = require('./dao/disciplina');
var professor = require('./dao/professor');
var cargo = require('./dao/cargo');

var app = express();

app.configure(function () {
	app.use(express.bodyParser());
	app.use(function (req, res, next) {
		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
		res.header("Pragma", "no-cache");
		res.header("Expires", 0);
		next();
	});
	app.use(function (err, req, res, next) {
		console.error(err.stack);
		res.send(500, 'Internal error: ' + err.message);
	});

	app.post('/bancas', banca.create);
	app.get('/bancas', banca.read);
	app.put('/bancas/:id', banca.update);
	app.delete('/bancas/:id', banca.delete);

	app.post('/orgaos', orgao.create);
	app.get('/orgaos', orgao.read);
	app.put('/orgaos/:id', orgao.update);
	app.delete('/orgaos/:id', orgao.delete);

	app.post('/areas-formacao', area_formacao.create);
	app.get('/areas-formacao', area_formacao.read);
	app.put('/areas-formacao/:id', area_formacao.update);
	app.delete('/areas-formacao/:id', area_formacao.delete);

	app.post('/areas-atuacao', area_atuacao.create);
	app.get('/areas-atuacao', area_atuacao.read);
	app.put('/areas-atuacao/:id', area_atuacao.update);
	app.delete('/areas-atuacao/:id', area_atuacao.delete);

	app.post('/disciplinas', disciplina.create);
	app.get('/disciplinas', disciplina.read);
	app.put('/disciplinas/:id', disciplina.update);
	app.delete('/disciplinas/:id', disciplina.delete);

	app.post('/professores', professor.create);
	app.get('/professores', professor.read);
	app.put('/professores/:id', professor.update);
	app.delete('/professores/:id', professor.delete);

	app.post('/cargos', cargo.create);
	app.get('/cargos', cargo.read);
	app.put('/cargos/:id', cargo.update);
	app.delete('/cargos/:id', cargo.delete);

});

http.createServer(app).listen(8080);
console.log('Server listening');