var http = require('http');
var https = require('https');
var express = require('express');

var banca = require('./dao/banca');

//var mysql = require('mysql');

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

});

http.createServer(app).listen(8080);
console.log('Server listening');