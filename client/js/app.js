/**
 * app config file
 */

var app = angular.module("myApp", ["ngRoute"]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
app.config(function($routeProvider,$locationProvider) {
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
    .when("/debate/:debateId",{
    	templateUrl :"view/debate2.html",
    	controller : "DebateController"
    });
});