/**
 * app config file
 */

var app = angular.module("myApp", ["ngRoute","ngCookies"]);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "view/browseDebates.html",
            controller: "BrowseDebatesController"
        })
        .when("/browseDebates", {
            templateUrl: "view/browseDebates.html",
            controller: "BrowseDebatesController"
        })
        .when("/createDebate", {
            templateUrl: "view/createDebate.html",
            controller: "MainController"
        })
        .when("/login", {
            templateUrl: "view/login.html",
            controller: "LoginController"
        })
        .when("/login/:userId", {
            templateUrl: "view/login.html",
            controller: "LoginController"
        })
        .when("/debate/:debateId", {
            templateUrl: "view/debate.html",
            controller: "DebateController"
        });
});