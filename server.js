/**
 * main server
 */

var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var path    = require("path");
var connect = require('connect')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/client'));
  // assign the template engine to .html files
  app.engine('html', consolidate['swig']);

  // set .html as the default extension
  app.set('view engine', 'html');

//DB configurations
var mongo =  require('./dbInit.js')(app);
var database;
app.connect(function(db){
	database = db;
});

app.connected= function() {
	return typeof database != 'undefined';
};

var getDB = function() {
	return database;
}

var mongodebate = require('./debate/mongo/mongodebate.js')(app,getDB);
var mongoarg = require('./argument/mongo/mongoArgument.js')(app,getDB);
var mongouser = require('./user/mongo/mongouser.js')(app,getDB);

//module configurations
var sendResponseJson = function(res,data){
	res.status(200).send(data);
}
require('./debate/debateServer.js')(app,sendResponseJson,io);
require('./argument/argumentsServer.js')(app,sendResponseJson);
require('./user/userserver.js')(app,sendResponseJson);

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Define routes.
app.get('/',
    function(req, res) {
      res.sendFile(path.join(__dirname+'/client/index.html'));
    });

server.listen(process.env.PORT || 8087, function() {
	console.log("Listening on port 8087");
});
//io.listen(app);

//io.on('connection', function(socket){
//    console.log("user connected"+JSON.stringify(socket));
//    socket.on('debateConnection',function(debateobject){
//        console.log('debate connection'+JSON.stringify(debateobject));
//        socket.join(debateobject._id);
//    });
//    socket.on('debateArgument',function(argument){
//        console.log('New argument:'+JSON.stringify(argument));
//        socket.broadcast.to(argument.debateId).emit('newArgumentInDebate', argument);
//    });
//    // socket.join('');
//});

io.sockets.on('connection', function(socket) {
    console.log('user connected');
    socket.emit('change', 'welcome from server');

    socket.on('newArg', function(obj) {
        socket.broadcast.emit(obj.debateId, obj);
    });

    socket.on('disconnect', function() {
        console.log("user disconnected");
    });
});

