myApp.controller('BrowseDebatesController',['$scope','$rootScope','$http','$location','$cookies',function($scope,$rootScope,$http,$location,$cookies){
	$scope.allDebates=[];
	$http.get('/saru/debates').then(function(response){
		console.log("response receiveed"+JSON.stringify(response));
		$scope.allDebates = response.data;
	});
}]);