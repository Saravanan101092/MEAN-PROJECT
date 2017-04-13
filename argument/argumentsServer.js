/**
 * 
 */

module.exports = function(app,sendResponseJson){
app.get('/saru/argument', function(req, res ){
	console.log("request received");
	if(!app.connected()){
		console.log("DB connection error")
	}
	app.getArguments(function(err, data){
		console.log("size:"+data.length);
		sendResponseJson(res,data);
	});
	
});

app.get('/saru/argument/:id', function(req, res ){
	console.log("request received with id"+req.params.id);
	if(!app.connected()){
		console.log("DB connection error")
	}
	
	app.getArgumentForID(req.params.id,function(err, data){
		console.log("size:"+JSON.stringify(data));
		sendResponseJson(res,data);
	});
	
});

app.post('/saru/arguments', function(req, res){
	console.log("POST argument creation method accessed!");
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
				sendResponseJson(res,result.ops);
			}
		});
	}

});

 app.put('/saru/arguments', function(req,res){
	 console.log("PUT argument edit methd accessed");
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
	console.log("Delete argument delete methd accessed");
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
}