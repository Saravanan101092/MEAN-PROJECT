app.controller('DebateController',['$http','$scope', '$location','$routeParams',function($http,$scope,$location,$routeParams){
	console.log("inside debate controller"+config.apiUrl);
	$http.get('/saru/debates/'+$routeParams.debateId).then(function(response){
		//console.log("response for debateid:"+JSON.stringify(response));
		$scope.currentDebate = response.data[0];
	});
	
	$http.get('/saru/debate/'+$routeParams.debateId+'/arguments/N').then(function(response){
		//console.log("response for debateid and proINd N:"+JSON.stringify(response));
		$scope.currentNArgs =[];
		$scope.currentNArgs = response.data;
	});
	$http.get('/saru/debate/'+$routeParams.debateId+'/arguments/Y').then(function(response){
		//console.log("response for debateid and proINd Y:"+JSON.stringify(response));
		$scope.currentPArgs =[];
		$scope.currentPArgs = response.data;
	});
	
	
	$scope.addArgument = function(arg, pInd){
		
		var argument = {};
		argument.debateId = $scope.currentDebate._id;
		argument.content = {};
		argument.content.text = arg;
		argument.content.supports = 0;
		argument.content.disputes = 0;
		argument.content.proInd = pInd;

		var result = $http.post('/saru/arguments',argument).then(function(response){
			if (argument.content.proInd === 'Y') {
				if ($scope.currentPArgs == 'undefined') {
					$scope.currentPArgs = [];
				}
				$scope.currentPArgs.push(response.data[0]);
			} else {
				if ($scope.currentNArgs === 'undefined') {
					$scope.currentNArgs = [];
				}
				$scope.currentNArgs.push(response.data[0]);
			}
		});
	}
}]);