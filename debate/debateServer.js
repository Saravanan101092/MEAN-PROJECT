var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var no = 0;
var mongo = require('./mongodebate.js');

mongo.connect();
var sendResponseJson = function(res,data){
	res.status(200).send(data);
}
app.get('/saru/debates', function(req, res ){
	console.log("request received");
	if(!mongo.connected()){
		console.log("DB connection error")
	}
	mongo.getDebates(function(err, data){
		console.log("size:"+data.length);
		sendResponseJson(res,data);
	});
	
});

app.get('/saru/debates/:id', function(req, res ){
	console.log("request received with id"+req.params.id);
	if(!mongo.connected()){
		console.log("DB connection error")
	}
	
	mongo.getDebateForID(req.params.id,function(err, data){
		console.log("size:"+JSON.stringify(data));
		sendResponseJson(res,data);
	});
	
});

app.post('/saru/debate/argument', function(req, res){
	console.log("POst method accessed!");
	var data = req.body;
	console.log(data);
	res.status(200).send("ID:"+ (++no));
});

app.post('/saru/debates', function(req, res){
	console.log("POST debate creation method accessed!");
	var data = req.body;
	if(!mongo.connected()){
		console.log("DB connection error")
		res.status(500).send("DB connectivity lost!");
	}else{
		mongo.createDebate(data,function(err,result){
			if(err!=null){
				console.log("Error during insert of data"+err);
				res.status(500).send("Internal error during insert"+err);
			}else{
				console.log("Data successfully inserted!");
				sendResponseJson(res,result.ops);
			}
		});
	}

});

 app.put('/saru/debates', function(req,res){
	 console.log("PUT debate edit methd accessed");
	 var data = req.body;
	
	 if(!mongo.connected()){
				 console.log("DB connection error")
		 res.status(500).send("DB connectivity lost!");
	 }else{
		 mongo.updateDebate(data, function(err, result){
			 if(err!=null){
				 console.log("Error during insert of data"+err);
				 res.status(500).send("Internal error during insert"+err);
			 }else{
				 console.log("Data successfully inserted!");
				 sendResponseJson(res,result);
			 }
		 });
	 }
 });

app.delete('/saru/debates', function(req,res){
	console.log("Delete debate delete methd accessed");
	var data = req.body;
	if(!mongo.connected()){
				console.log("DB connection error")
		res.status(500).send("DB connectivity lost!");
	}else{
		mongo.deleteDebate(data,function(err, result){
			if(err!=null){
				console.log("Error during delete of data"+err);
				res.status(500).send("Internal error during delete"+err);
			}else{
				console.log("Data successfully deleted!");
				sendResponseJson(res,result);
			}
		});
	}
});
app.listen(8087, function() {
	console.log("Listening on port 8087");
});