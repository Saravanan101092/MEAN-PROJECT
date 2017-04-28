app.controller('BrowseDebatesController',['$scope','$http','$location',function($scope,$http,$location){
	console.log("inside browsedebate controller ");
	$scope.allDebates=[];
	$http.get('/saru/debates').then(function(response){
		console.log("response receiveed"+JSON.stringify(response));
		$scope.allDebates = response.data;
	});
}]);