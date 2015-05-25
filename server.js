var express = require('express');
var app = express();

app.get('/api/estudiantes', function(req, res){
	res.json({data : {nombre: "rene", apellido : "apellido"}});
})

app.listen(8080, function(req, res){
	console.log('Connected al puerto 8080');
})