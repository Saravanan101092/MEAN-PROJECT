/**
 * 
 */
/**
 * Debate controller
 */

app.controller('MainController',['$http','$scope','$location','config',function($http, $scope,$location,config){
	console.log("inside main controller"+config.apiUrl);
	$scope.debate={};
	$scope.submitDebate= function(){
		console.log("inside submit debate method:" + JSON.stringify($scope.debate));
		var result = $http.post(config.apiUrl+'/saru/debates',$scope.debate).then(function(response){
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

app.controller('BrowseDebatesController',['$scope','$http','config',function($scope,$http,config){
	console.log("inside browsedebate controller "+config.apiUrl);
	$scope.allDebates=[];
	$http.get(config.apiUrl+'/saru/debates').then(function(response){
		console.log("response receiveed"+JSON.stringify(response));
		$scope.allDebates = response.data;
		console.log(((allDebates.length/3)+1));
		$scope.drows = new Array(((allDebates.length/3)+1));
	});
}]);
