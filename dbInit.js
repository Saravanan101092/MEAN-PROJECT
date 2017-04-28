/**
 * 
 */
var MongoClient = require('mongodb').MongoClient;

var dbConnection = module.exports = function(app){
	app.connect= function(cb) {
		console.log("connecting..");
		MongoClient.connect('mongodb://saru101092:Saru%402017@cluster0-shard-00-00-ld6l0.mongodb.net:27017,cluster0-shard-00-01-ld6l0.mongodb.net:27017,cluster0-shard-00-02-ld6l0.mongodb.net:27017/warDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', function(err, db) {
			if (err) {
				return console.log("Error: " + err);
			}
			cb(db)
		});
	};
}