myApp.factory('Authentication',
  ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
  function($rootScope, $location, $firebaseObject, $firebaseAuth) {

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var fbprovider = new firebase.auth.FacebookAuthProvider();

  fbprovider.addScope('public_profile');
  fbprovider.addScope('email');


  
  var myObject;

  auth.$onAuthStateChanged(function(authUser) {
    var userB = firebase.auth().currentUser;


    if(authUser) {

      if(authUser.providerData[0].providerId=="facebook.com"){

        var user = {};
        user.fullname = authUser.providerData[0].displayName;
        user.email = authUser.providerData[0].email;
        user.photourl = authUser.providerData[0].photoURL;
        user.regUser = authUser.providerData[0].uid;
        user.providerID = authUser.providerData[0].providerId;
        $rootScope.currentUser=user;
        $rootScope.$apply();
      }else{
        firebase.database().ref('/users/' + authUser.uid).once('value').then(function(snapshot) {
        var user = {};
        user.fullname = snapshot.val().fullname;
        user.email = snapshot.val().email;
        user.regUser =  snapshot.val().uid;
        user.date =  snapshot.val().date;
        user.firstname =  snapshot.val().firstname;
        user.lastname =  snapshot.val().lastname;

         $rootScope.currentUser=user;
        $rootScope.$apply();
        });
        //var userRef = ref.child('users').child(authUser.uid);
        //var userObj = $firebaseObject(userRef);
       // $rootScope.currentUser = userObj;

      }
    } else {
      console.log('setting user to null');

      $rootScope.currentUser = '';
    }
  });

  myObject = {
    login: function(user) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $location.path('/browseDebates');
        $rootScope.showMsgBriefly("Log in successful","alert-success");
      }).catch(function(error) {
        $rootScope.showMsgBriefly(error.message,'alert-danger');
            console.log("Login error:"+error.message);
      }); //signInWithEmailAndPassword
    }, //login

    logout: function() {
      return auth.$signOut();
      $rootScope.showMsgBriefly("Logged Out!","alert-success");
      $rootScope.$apply();
    }, //logout

    requireAuth: function() {
      return auth.$requireSignIn();
    }, //require Authentication

    register: function(user) {
      user.fullname = user.firstname+' '+user.lastname;
      console.log('register method in auth'+user.fullname);
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(regUser) {
            console.log("inside register athenservice");
        var regRef = ref.child('users')
          .child(regUser.uid).set({
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            fullname: user.fullname,
            email: user.email
          }); //userinfo

          regUser.sendEmailVerification().then(function() {
              // Email sent.
            console.log('Email verification sent');
            $rootScope.showMsgBriefly("Verification email sent!. Please check you email inbox!","alert-success");
            }, function(error) {
              // An error happened.
            console.log('Error while sending verification email :'+error.message);
            });
         myObject.login(user);
      }).catch(function(error) {
        $rootScope.showMsgBriefly(error.message,'alert-danger');
      }); //createUserWithEmailAndPassword
    }, //register

    fbLogin: function(){
firebase.auth().signInWithPopup(fbprovider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  console.log("FB auth complete "+token+" "+JSON.stringify(result.user));
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = {};
  user.regUser = result.user.uid;
  user.fullname = result.user.displayName;
  user.email = result.user.email;
  user.photoURL = result.user.photoURL;
   $rootScope.currentUser = user;
   $location.path('/browseDebates');
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  $rootScope.showMsgBriefly(error.message,'alert-danger');
  console.log("FB login error : "+error.message);
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
    }
  }; //return


  return myObject;

}]); //factory