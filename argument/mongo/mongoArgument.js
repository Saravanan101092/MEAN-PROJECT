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
			getDB().collection('Arguments').updateOne({_id: new ObjectId(id)},{
			$set: { content: argument.content }},
			cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	app.deleteArgument= function(argument, cb){
		if(argument!=null){
			getDB().collection('Arguments').deleteOne({_id: new ObjectId(argument._id)},cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	app.getArgumentForID= function(id,cb){
		if(id!=null){
			var cursor = getDB().collection('Arguments').find({_id: new ObjectId(id)});
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
	app.deleteAllArguments= function(cb){
		console.log("Delete mongo auguments");
		getDB().collection('Arguments').remove({},cb);
	};
	app.addSupport = function(id,user,cb){
		getDB().collection('Arguments').updateOne({_id: new ObjectId(id)},{
			$push: { "content.supports": user }},
			cb);
	};
	app.removeSupport = function(id,user,cb){
		getDB().collection('Arguments').updateOne({_id: new ObjectId(id)},{
			$pull: { "content.supports": {"s_email":user.s_email, "name": user.name}} },
			cb);
	};
	app.addDispute = function(id,user,cb){
		getDB().collection('Arguments').updateOne({_id: new ObjectId(id)},{
			$push: { "content.disputes": user }},
			cb);
	};
	app.removeDispute = function(id,user,cb){
		getDB().collection('Arguments').updateOne({_id: new ObjectId(id)},{
			$pull: { "content.disputes": {"s_email":user.s_email, "name": user.name}} },
			cb);
	};
	app.addCounter = function(id,argumentId,cb){
		getDB().collection('Arguments').updateOne({_id: new ObjectId(id)},{
			$push: { "content.counters": argumentId }},
			cb);
	};
	app.removeCounter = function(id,argumentId,cb){
		getDB().collection('Arguments').updateOne({_id: new ObjectId(id)},{
			$pull: { "content.counters": { $in: [argumentId]}} },
			cb);
	};
}
