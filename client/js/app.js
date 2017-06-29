/**
 * app config file
 */

var myApp = angular.module("myApp", ["ngRoute","ngCookies","firebase"]);

myApp.run(['$rootScope', '$location','$timeout', function($rootScope, $location,$timeout) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
        if (error == 'AUTH_REQUIRED') {
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/login');
        }//Auth Required
    }); //$routeChangeError
   
    $rootScope.hideMsg = function(){
        $rootScope.message = "";
        $rootScope.msgClass = "";
    }
    $rootScope.showMsgBriefly = function(msg,msgClas){
        $rootScope.message = msg;
        $rootScope.msgClass = msgClas;
        $timeout(function(){$rootScope.hideMsg();},5000);
    }

   
}]);

myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/browseDebates", {
            templateUrl: "view/browseDebates.html",
            controller: "BrowseDebatesController",
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                } //currentAuth
            }//resolve
        })
        .when("/createDebate", {
            templateUrl: "view/createDebate.html",
            controller: "MainController",
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                } //currentAuth
            }//resolve
        })
        .when("/login", {
            templateUrl: "view/login.html",
            controller: "LoginController"
        })
        .when("/registration", {
            templateUrl: "view/register.html",
            controller: "LoginController"
        })
        .when("/debate/:debateId", {
            templateUrl: "view/debate.html",
           // controller: "DebateController"
        })
        .otherwise({redirectTo: '/browseDebates'});
});