module.exports = function(app, sendResponseJson,io ){
	
app.get('/saru/debates', function(req, res ){
	if(!app.connected()){
		console.log("DB connection error")
	}
	app.getDebates(function(err, data){
		console.log("size:"+data.length);
		sendResponseJson(res,data);
	});
	
});

app.get('/saru/debates/:id', function(req, res ){
	console.log("request received with debate id"+req.params.id);
	if(!app.connected()){
		console.log("DB connection error")
	}
	
	app.getDebateForID(req.params.id,function(err, data){
		sendResponseJson(res,data[0]);
	});
	
});

app.post('/saru/debates', function(req, res){
	var data = req.body;
	if(!app.connected()){
		console.log("DB connection error")
		res.status(500).send("DB connectivity lost!");
	}else{
		app.createDebate(data,function(err,result){
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

 app.put('/saru/debates', function(req,res){
	 var data = req.body;
	
	 if(!app.connected()){
				 console.log("DB connection error")
		 res.status(500).send("DB connectivity lost!");
	 }else{
		 app.updateDebate(data, function(err, result){
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
	var data = req.body;
	if(!app.connected()){
				console.log("DB connection error")
		res.status(500).send("DB connectivity lost!");
	}else{
		app.deleteDebate(data,function(err, result){
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

app.get('/saru/debate/deleteall',function(req,res){
	console.log("!!! Delete All Debates Method triggered !!!");
	app.deleteAllDebates(function(err,numberRemoved){
		if(typeof err == 'undefined'){
			console.log("Error during delete All "+err.message);
		}
		console.log(numberRemoved+" debates deleted");
		sendResponseJson(res,numberRemoved);
	});
});

}