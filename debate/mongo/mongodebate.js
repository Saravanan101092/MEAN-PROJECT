var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,getDB){
	app.getDebates= function(cb) {
		var cursor = getDB().collection('Debates').find();
		cursor.toArray(cb);
	};
	
	app.createDebate= function(debateData, cb){
		if(debateData!=null){
			debateData.content.crteDt = new Date();
			getDB().collection('Debates').insert(debateData,cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	
	app.updateDebate= function(debateData, cb){
		 if(debateData!=null){
			var id = debateData._id;
			debateData.content.mdfydDt = new Date();
			getDB().collection('Debates').updateOne({_id: new ObjectID(id)},{
			$set: { content: debateData.content }},
			cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	app.deleteDebate= function(debateData, cb){
		if(debateData!=null){
			getDB().collection('Debates').deleteOne({_id: new ObjectID(debateData._id)},cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	};
	app.getDebateForID= function(id,cb){
		if(id!=null){
			var cursor = getDB().collection('Debates').find({_id: new ObjectID(id)});
			cursor.toArray(cb);
		}else{
			console.log("Id is null");
			cb();
		}
	};
	app.deleteAllDebates= function(cb){
		getDB().collection('Debates').remove({},cb);
	};
}
