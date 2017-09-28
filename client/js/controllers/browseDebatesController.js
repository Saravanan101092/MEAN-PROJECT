myApp.controller('BrowseDebatesController',['$scope','$rootScope','$http','$location','$cookies',function($scope,$rootScope,$http,$location,$cookies){
	$scope.allDebates=[];
	$http.get('/saru/debates').then(function(response){
		$scope.allDebates = response.data;
	});
}]);