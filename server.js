var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var app = express();

var PORT = 8080;
var HOST = "0.0.0.0";

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
	limit: '50mb',
	extended: true, 
	parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.get('/', function(reckor,resin){
	resin.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/fileupload', function(req,res){
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      	var oldpath = files.filetoupload.path;
      	var newpath = '/Users/jaredthomas/Desktop/' + files.filetoupload.name;
      	fs.rename(oldpath, newpath, function (err) {
	    	if(err) throw err;
	    	res.write('File uploaded and moved');
	    	res.end();
	    });
    });
})

app.listen(PORT, function(){
	console.log(`Running on http://${HOST}:${PORT}`);
});
