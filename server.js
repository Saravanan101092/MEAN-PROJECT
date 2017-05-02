/**
 * main server
 */

var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var consolidate = require('consolidate');
var path    = require("path");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var callbackUrl = 'https://sarudebates.herokuapp.com/login/facebook/return';
if(process.argv[2]) {
  callbackUrl='http://localhost:8087/login/facebook/return';
}
console.log('callback url facebook is'+callbackUrl);
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
require('./debate/debateServer.js')(app,sendResponseJson);
require('./argument/argumentsServer.js')(app,sendResponseJson);
require('./user/userserver.js')(app,sendResponseJson);


passport.use(new Strategy({
      clientID: 419543241753114,
      clientSecret: 'f1aea189260bab24e320561654e1d76b',
      callbackURL: callbackUrl,
      profileFields: ['id', 'displayName', 'gender','name', 'photos', 'emails']

    },
    function(accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.

      profile.accessToken = accessToken;

      console.log("profile:"+JSON.stringify(profile));
      console.log("accessToken:"+JSON.stringify(accessToken));
      console.log("refreshToken:"+JSON.stringify(refreshToken));
      return cb(null, profile);
    }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
    function(req, res) {
      res.sendFile(path.join(__dirname+'/client/index.html'));
    });

app.get('/login:',
    function(req, res){
      res.render('login');
    });

app.get('/login/facebook',
    passport.authenticate('facebook',{ scope: 'email'}));


app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('user in callback'+JSON.stringify(req.user));

      app.getUserForEmail(req.user._json.email,function(err,result){
        if(err!=null){
          console.log('error while checking email duplicates');
        }else{
          if(result.length>0){
            //email already present
            app.updateFBInfo(result[0]._id,req.user,function(err,updatedRes){
              console.log('FB details updated'+JSON.stringify(updatedRes));
              res.cookie("UserID",JSON.stringify(result[0]._id));
                return res.redirect('/');
            });
          }else{
            //new email
            app.addFBUser(req.user,function(err,res){
              console.log('FB details added'+JSON.stringify(res));
                res.cookie("UserID",JSON.stringify(res[0]._id));
                return res.redirect('/');
            });
          }
        }
      });

    });

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.


app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.render('profile', { user: req.user });
    });






app.listen(process.env.PORT || 8087, function() {
	console.log("Listening on port 8087");
});