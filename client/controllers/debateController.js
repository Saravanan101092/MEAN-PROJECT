myApp.controller('DebateController',['$http','$scope', '$rootScope','$location','$routeParams',function($http,$scope,$rootScope,$location,$routeParams){
	console.log("inside debate controller");
	$http.get('/saru/debates/'+$routeParams.debateId).then(function(response){
		//console.log("response for debateid:"+JSON.stringify(response));
		$scope.currentDebate = response.data;
	});
	
	$http.get('/saru/debate/'+$routeParams.debateId+'/arguments/N').then(function(response){
		//console.log("response for debateid and proINd N:"+JSON.stringify(response));
		$scope.currentNArgs =[];
		$scope.currentNArgs = response.data;
		console.log(JSON.stringify(response.data));
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
		argument.user={};
		argument.user.email=$rootScope.currentUser.email;
		argument.user.fullname=$rootScope.currentUser.fullname;
		argument.user.firstname = $rootScope.currentUser.firstname;
		argument.user.lastname =$rootScope.currentUser.lastname;
		argument.user.id=$rootScope.currentUser.regUser;
		argument.user.photourl = $rootScope.currentUser.photourl;
		var result = $http.post('/saru/arguments',argument).then(function(response){
			console.log('argument response'+JSON.stringify(response));
			if (argument.content.proInd === 'Y') {
				if ($scope.currentPArgs == 'undefined') {
					$scope.currentPArgs = [];
				}
				$scope.currentPArgs.push(response.data);
			} else {
				if ($scope.currentNArgs === 'undefined') {
					$scope.currentNArgs = [];
				}
				$scope.currentNArgs.push(response.data);
			}
		});
	}

	$scope.getAvatarSrc = function(fname,lname,user){
		if(user.photourl){
			console.log('returning photourl'+user.photourl);
			return user.photourl;
		}else {

			var initial = fname.slice(0, 1);
			initial += lname.slice(0, 1);
			var src = "http://placehold.it/50/55C1E7/fff&amp;text=";
			console.log("user:"+user.regUser+" "+src+" "+initial);
			return src + initial;
		}
	}
}]);