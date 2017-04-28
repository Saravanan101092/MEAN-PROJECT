/**
 * app config file
 */

var app = angular.module("myApp", ["ngRoute"]);
app.constant('config', {  
  apiUrl: 'https://sarudebates.herokuapp.com',
  baseUrl: '/',
  enableDebug: true
});
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
app.config(function($routeProvider,$locationProvider,config) {
    $routeProvider
    .when("/", {
        templateUrl : "view/browseDebates.html"
    })
    .when("/browseDebates", {
        templateUrl : "view/browseDebates.html"
    })
    .when("/createDebate", {
        templateUrl : "view/createDebate.html",
        controller : "MainController"
    })
	.when("/login", {
        templateUrl : "view/login.html",
        controller : "LoginController"
    })
    .when("/debate/:debateId",{
    	templateUrl :"view/debate2.html",
    	controller : "DebateController"
    });
});