var http = require('http');
var https = require('https');
var express = require('express');

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
	app.get('/bancas', function (req, res) { res.send([{a:'a'}]); } );
});

http.createServer(app).listen(8080);
console.log('server listening');
