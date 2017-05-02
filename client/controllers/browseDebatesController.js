app.controller('BrowseDebatesController',['$scope','$rootScope','$http','$location','$cookies',function($scope,$rootScope,$http,$location,$cookies){
	$rootScope.debateuser={};
	$rootScope.authenticated=false;
	console.log("Cookie"+$cookies.get('UserID'));
	if(typeof $cookies.get('UserID') !='undefined'){
		var userID = $cookies.get('UserID').replace(/['"]+/g, '');
		console.log("Cookie"+userID);
		$http.get('/saru/users/'+userID).then(function(response){
			console.log('User from ID after login:'+JSON.stringify(response));
			$rootScope.debateuser = response.data;
			$rootScope.authenticated=true;
		});
	}
	$scope.allDebates=[];
	$http.get('/saru/debates').then(function(response){
		console.log("response receiveed"+JSON.stringify(response));
		$scope.allDebates = response.data;
	});
}]);