/**
 * main server
 */

var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongo =  require('./dbInit.js')(app);
var database;
app.connect(function(db){
	database = db;
});

app.connected= function() {
	return typeof database != 'undefined';
};

var getDB = function() {
	return database;
}

var mongodebate = require('./debate/mongo/mongodebate.js')(app,getDB);
var mongoarg = require('./argument/mongo/mongoArgument.js')(app,getDB);

var sendResponseJson = function(res,data){
	res.status(200).send(data);
}
require('./debate/debateServer.js')(app,sendResponseJson);
require('./argument/argumentsServer.js')(app,sendResponseJson);

app.listen(8087, function() {
	console.log("Listening on port 8087");
});