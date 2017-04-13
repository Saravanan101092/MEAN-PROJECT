/**
 * 
 */
var MongoClient = require('mongodb').MongoClient;

var dbConnection = module.exports = function(app){
	app.connect= function(cb) {
		console.log("connecting..");
		MongoClient.connect('mongodb://localhost:27017/warDB', function(err, db) {
			if (err) {
				return console.log("Error: " + err);
			}
			cb(db)
		});
	};
}