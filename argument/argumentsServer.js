/**
 * 
 */

module.exports = function(app,sendResponseJson){
app.get('/saru/argument', function(req, res ){
	if(!app.connected()){
		console.log("DB connection error")
	}
	app.getArguments(function(err, data){
		sendResponseJson(res,data[0]);
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
}