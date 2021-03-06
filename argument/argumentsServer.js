/**
 * 
 */
var ObjectId = require('mongodb').ObjectID;
module.exports = function(app,sendResponseJson){
app.get('/saru/argument', function(req, res ){
	if(!app.connected()){
		console.log("DB connection error")
	}
	app.getArguments(function(err, data){
		sendResponseJson(res,data);
	});
	
});

app.get('/saru/argument/:id', function(req, res ){

	if(!app.connected()){
		console.log("DB connection error")
	}
	
	app.getArgumentForID(req.params.id,function(err, data){

		sendResponseJson(res,data[0]);
	});
	
});

app.post('/saru/arguments', function(req, res){
	var data = req.body;
	if(!app.connected()){
		console.log("DB connection error")
		res.status(500).send("DB connectivity lost!");
	}else{
		app.createArgument(data,function(err,result){
			if(err!=null){
				console.log("Error during insert of data"+err);
				res.status(500).send("Internal error during insert"+err);
			}else{
				console.log("Data successfully inserted!");
				sendResponseJson(res,result.ops[0]);
			}
		});
	}

});

 app.put('/saru/arguments', function(req,res){
	 var data = req.body;
	
	 if(!app.connected()){
				 console.log("DB connection error")
		 res.status(500).send("DB connectivity lost!");
	 }else{
		 app.updateArgument(data, function(err, result){
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

app.delete('/saru/arguments', function(req,res){
	var data = req.body;
	if(!app.connected()){
				console.log("DB connection error")
		res.status(500).send("DB connectivity lost!");
	}else{
		app.deleteArgument(data,function(err, result){
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

app.get('/saru/debate/:debateID/arguments/:proInd',function(req,res){
	if(!app.connected()){
		console.log("DB connection error")
	}
	if(req.params.proInd == 'Y' || req.params.proInd == 'N' ){
		app.getArgsForQID(req.params.debateID,req.params.proInd,function(err, data){
			sendResponseJson(res,data);
		});
	}
});

app.get('/saru/debate/:debateID/arguments', function(req,res){
	if(!app.connected()){
		console.log("DB connection error")
	}
	app.getAllArgsForQID(req.params.debateID,function(err, data){
		sendResponseJson(res,data);
	});
});

app.get('/saru/arguments/deleteall',function(req,res){
	console.log("!!! Delete All Arguments Method triggered !!!");
	app.deleteAllArguments(function(err,numberRemoved){
		if(typeof err == 'undefined'){
			console.log("Error during delete All "+err.message);
		}
		console.log(numberRemoved+" arguments deleted");
		sendResponseJson(res,numberRemoved);
	});
});

app.put('/saru/arguments/:argumentID/support/add',function(req,res){

	app.addSupport(req.params.argumentID,req.body,function(err,result){
 			if(err!=null){
				 console.log("Error during adding support"+err);
				 res.status(500).send("Internal error during update"+err);
			 }else{
				 sendResponseJson(res,result);
			 }
	});
});

app.put('/saru/arguments/:argumentID/support/remove',function(req,res){

	app.removeSupport(req.params.argumentID,req.body,function(err,result){
 			if(err!=null){
				 console.log("Error during removing support"+err);
				 res.status(500).send("Internal error during update"+err);
			 }else{
				 sendResponseJson(res,result);
			 }
	});
});

app.put('/saru/arguments/:argumentID/dispute/add',function(req,res){

	app.addDispute(req.params.argumentID,req.body,function(err,result){
 			if(err!=null){
				 console.log("Error during adding dispute"+err);
				 res.status(500).send("Internal error during update"+err);
			 }else{
				 sendResponseJson(res,result);
			 }
	});
});

app.put('/saru/arguments/:argumentID/dispute/remove',function(req,res){

	app.removeDispute(req.params.argumentID,req.body,function(err,result){
 			if(err!=null){
				 console.log("Error during removing dispute"+err);
				 res.status(500).send("Internal error during update"+err);
			 }else{
				 sendResponseJson(res,result);
			 }
	});
});

app.put('/saru/arguments/:argumentID/counter/add/:counterID',function(req,res){

	app.addCounter(req.params.argumentID,req.params.counterID,function(err,result){
 			if(err!=null){
				 console.log("Error during adding support"+err);
				 res.status(500).send("Internal error during update"+err);
			 }else{
				 sendResponseJson(res,result);
			 }
	});
});

app.put('/saru/arguments/:argumentID/counter/remove/:counterID',function(req,res){

	app.removeCounter(req.params.argumentID,req.params.counterID,function(err,result){
 			if(err!=null){
				 console.log("Error during removing support"+err);
				 res.status(500).send("Internal error during update"+err);
			 }else{
				 sendResponseJson(res,result);
			 }
	});
});

app.post('/saru/arguments/multiple',function(req,res){
	var data = req.body;
	console.log(JSON.stringify(req.body));
	var objectIDs = [];
	for(var i=0; j=data.length,i<j; i++){
		console.log(data[i]);
		objectIDs.push(new ObjectId(data[i]));
	}
	app.getCounters(objectIDs,function(err, data){
		sendResponseJson(res,data);
	});
});
}