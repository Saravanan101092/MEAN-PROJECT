app.controller('BrowseDebatesController',['$scope','$http','$location',function($scope,$http,$location){
	console.log("inside browsedebate controller "+JSON.stringify($scope.user));
	//if(typeof $routeParams.userId !='undefined'){
	//	$http.get('/saru/users/'+$routeParams.userId).then(function(response){
	//		console.log('User from ID after login:'+response);
	//		$scope.user = response.data;
	//		$location.path('/');
	//	});
	//}
	$scope.allDebates=[];
	$http.get('/saru/debates').then(function(response){
		console.log("response receiveed"+JSON.stringify(response));
		$scope.allDebates = response.data;
	});
}]);