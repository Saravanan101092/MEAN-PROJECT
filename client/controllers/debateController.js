myApp.controller('DebateController',['$http','$scope', '$rootScope','$location','$routeParams',function($http,$scope,$rootScope,$location,$routeParams){
	console.log("inside debate controller");
	var socket = io.connect('/');
	console.log("socketID"+JSON.stringify(socket.id));
	socket.on('change', function(obj) {
		console.log("hellow message from server"+JSON.stringify(obj));
	});

	$scope.addDebateConn = function() {
		console.log('listening to debate room'+$scope.currentDebate._id)
		socket.on($scope.currentDebate._id, function (argument) {
			//console.log('debate specific message'+JSON.stringify(argument));
			if (argument.content.proInd === 'Y') {
				if ($scope.currentPArgs == 'undefined') {
					$scope.currentPArgs = [];
				}
				$scope.currentPArgs.push(argument);
			} else {
				if ($scope.currentNArgs === 'undefined') {
					$scope.currentNArgs = [];
				}
				$scope.currentNArgs.push(argument);
			}
			$scope.$apply();
		});
	}

	$http.get('/saru/debates/'+$routeParams.debateId).then(function(response){
		//console.log("response for debateid:"+JSON.stringify(response));
		$scope.currentDebate = response.data;
		console.log('listening to debate room'+$scope.currentDebate._id)
		socket.on($scope.currentDebate._id, function (argument) {
			console.log('debate specific message'+JSON.stringify(argument));
			if (argument.content.proInd === 'Y') {
				if ($scope.currentPArgs == 'undefined') {
					$scope.currentPArgs = [];
				}
				$scope.currentPArgs.push(argument);
			} else {
				if ($scope.currentNArgs === 'undefined') {
					$scope.currentNArgs = [];
				}
				$scope.currentNArgs.push(argument);
			}
			$scope.$apply();
		});

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
		argument.content.supports = [];
		argument.content.disputes = [];
		argument.content.counters = [];
		argument.content.proInd = pInd;
		argument.user={};
		argument.user.email=$rootScope.currentUser.email;
		argument.user.fullname=$rootScope.currentUser.fullname;
		argument.user.firstname = $rootScope.currentUser.firstname;
		argument.user.lastname =$rootScope.currentUser.lastname;
		argument.user.id=$rootScope.currentUser.regUser;
		argument.user.photourl = $rootScope.currentUser.photourl;
		var result = $http.post('/saru/arguments',argument).then(function(response){

			if (argument.content.proInd === 'Y') {
				if ($scope.currentPArgs == 'undefined') {
					$scope.currentPArgs = [];
				}
				$scope.currentPArgs.push(response.data);
				$scope.txtPArg="";
			} else {
				if ($scope.currentNArgs === 'undefined') {
					$scope.currentNArgs = [];
				}
				$scope.currentNArgs.push(response.data);
				$scope.txtNArg="";
			}
			socket.emit('newArg', response.data);
		});
	}

	$scope.getAvatarSrc = function(fname,lname,user){
		if(user.photourl){
			return user.photourl;
		}else {

			var initial = fname.slice(0, 1);
			initial += lname.slice(0, 1);
			var src = "http://placehold.it/50/55C1E7/fff&amp;text=";
			return src + initial;
		}
	}

	$scope.addSupport = function(argument,index){
		var user = {};
		user.s_email = $rootScope.currentUser.email;
		user.name = $rootScope.currentUser.fullname;
		var updatedArg = {};
		$http.post('/saru/arguments/'+argument._id+'/support/add',user).then(function(response){
			console.log("support added");
			$http.get('/saru/argument/'+argument._id).then(function(response){
				updatedArg = response.data;
			});
		});
		updatedArg.supportFlag = true;
		if (argument.content.proInd === 'Y') {
			$scope.currentPArgs[index] =  updatedArg;
		}else{
			$scope.currentNArgs[index] =  updatedArg;
		}
		$scope.$apply();
	}
	$scope.removeSupport = function(){
		var user = {};
		user.s_email = $rootScope.currentUser.email;
		user.name = $rootScope.currentUser.fullname;
		var updatedArg = {};
		$http.post('/saru/arguments/'+argument._id+'/support/remove',user).then(function(response){
			console.log("support removed");
			$http.get('/saru/argument/'+argument._id).then(function(response){
				updatedArg = response.data;
			});
		});
		updatedArg.supportFlag = false;
		if (argument.content.proInd === 'Y') {
			$scope.currentPArgs[index] =  updatedArg;
		}else{
			$scope.currentNArgs[index] =  updatedArg;
		}
		$scope.$apply();
	}
	$scope.addDispute = function(){

	}
	$scope.removeDispute = function(){
		
	}
	$scope.addCounter = function(){

	}
	$scope.removeCounter = function(){
		
	}
}]);