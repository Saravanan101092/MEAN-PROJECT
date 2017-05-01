
/**
 * Debate controller
 */

app.controller('MainController',['$http','$scope','$location',function($http, $scope,$location){
	console.log("inside main controller");
	$scope.debate={};
	$scope.submitDebate= function(){
		console.log("inside submit debate method:" + JSON.stringify($scope.debate));
		var result = $http.post('/saru/debates',$scope.debate).then(function(response){
			console.log("response object:"+JSON.stringify(response));
			$scope.currentDebate=response.data[0];
			$location.path('/debate/'+response.data[0]._id);
		});
	console.log("response is"+JSON.stringify($scope.resultdebate));
	}
	$scope.addProData = function(data){
		console.log("inside addprodata");
		if(angular.isUndefined($scope.debate.content.pro_data)){
			console.log("inside if loop");
			$scope.debate.content.pro_data=[];
			$scope.debate.content.pro_data.push(data);
			$scope.proData="";
			
		}else{
			console.log("inside else loop");
			$scope.debate.content.pro_data.push(data);
			$scope.proData="";
		}
	}
	$scope.addConData = function(data){
		console.log("inside addcondata");
		if(	angular.isUndefined($scope.debate.content.con_data)){
			$scope.debate.content.con_data=[];
			$scope.debate.content.con_data.push(data);
			$scope.conData="";
		}else{
			$scope.debate.content.con_data.push(data);
			$scope.conData="";
		}
	}
	
}]);

