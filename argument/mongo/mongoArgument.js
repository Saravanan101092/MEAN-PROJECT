/**
 * 
 */

var ObjectId = require('mongodb').ObjectID;
module.exports = function(app,getDB){
	app.getArguments= function(cb) {
		var cursor = getDB().collection('Arguments').find();
		cursor.toArray(cb);
	};
	
	app.createArgument= function(argument, cb){
		if(argument!=null){
			argument.content.crteDt = new Date();
			console.log('adding argument'+JSON.stringify(argument));
			getDB().collection('Arguments').insert(argument,cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	
	app.updateArgument= function(argument, cb){
		 if(argument!=null){
			var id = argument._id;
			argument.content.mdfydDt = new Date();
			getDB().collection('Arguments').updateOne({_id: new ObjectID(id)},{
			$set: { content: argument.content }},
			cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	app.deleteArgument= function(argument, cb){
		if(argument!=null){
			getDB().collection('Arguments').deleteOne({_id: new ObjectID(argument._id)},cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	app.getArgumentForID= function(id,cb){
		if(id!=null){
			var cursor = getDB().collection('Arguments').find({_id: new ObjectID(id)});
			cursor.toArray(cb);
		}else{
			console.log("Id is null");
			cb();
		}
	};
	app.getProArgumentsForQID= function (id, cb){
		if(id!=null){
			var cursor = getDB().collection('Arguments').find({debateId: id, "content.proInd":"Y"});
			cursor.toArray(cb);
		}else{
			console.log("Id is null");
			cb();
		}
	};
	app.getConArgsForQID= function (id, cb){
		if(id!=null){
			var cursor = getDB().collection('Arguments').find({debateId: id,"content.proInd":"N"});
			cursor.toArray(cb);
		}else{
			console.log("Id is null");
			cb();
		}
	};
	app.getArgsForQID= function (id, proIn, cb){
		if(id!=null){
			console.log("debate:"+id+" pro:"+proIn);
			var cursor = getDB().collection('Arguments').find({debateId: id,"content.proInd": proIn});
			cursor.toArray(cb);
		}else{
			console.log("Id is null");
			cb();
		}
	};
	app.getAllArgsForQID= function (id, cb){
		if(id!=null){
			var cursor = getDB().collection('Arguments').find({debateId: id});
			cursor.toArray(cb);
		}else{
			console.log("Id is null");
			cb();
		}
	};

}
