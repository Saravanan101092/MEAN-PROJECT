/**
 * 
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var database;

module.exports = {
	connect: function() {
		MongoClient.connect('mongodb://localhost:27017/warDB', function(err, db) {
			if (err) {
				return console.log("Error: " + err);
			}
		database=db;
			//db.open(function(err, db) {
				//database = db;
				//console.log("Connected to database.");
			//});
		});
	},
	connected: function() {
		return typeof database != 'undefined';
	},
	getDebates: function(cb) {
		var cursor = database.collection('Debates').find();
		cursor.toArray(cb);
	},
	
	createDebate: function(debateData, cb){
		if(debateData!=null){
			database.collection('Debates').insert(debateData,cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	},
	
	 updateDebate: function(debateData, cb){
		 if(debateData!=null){
			var id = debateData._id;
			database.collection('Debates').updateOne({_id: new ObjectID(id)},{
			$set: { content: debateData.content }},
			cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	},
	deleteDebate: function(debateData, cb){
		if(debateData!=null){
			database.collection('Debates').deleteOne({_id: new ObjectID(debateData._id)},cb);
		}else{
			console.log("Error null data cannot be inserted!");
			cb();
		}
	},
	getDebateForID: function(id,cb){
		if(id!=null){
			var cursor = database.collection('Debates').find({_id: new ObjectID(id)});
			cursor.toArray(cb);
		}else{
			console.log("Id is null");
			cb();
		}
	}

}
