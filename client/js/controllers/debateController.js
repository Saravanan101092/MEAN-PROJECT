myApp.controller('DebateController',['$http','$scope', '$rootScope','$location','$routeParams',function($http,$scope,$rootScope,$location,$routeParams){
	console.log("inside debate controller");
	var socket = io.connect('/');
	console.log("socketID"+JSON.stringify(socket.id));
	socket.on('change', function(obj) {
		console.log("hellow message from server"+JSON.stringify(obj));
	});

	var checkSupported = function(argument){
		var email = $rootScope.currentUser.email;
		var flag = false;
		if(argument) {
			angular.forEach(argument.content.supports, function (value, key) {
				if (JSON.stringify(email) === JSON.stringify(value.s_email)) {
					flag = true;
				}
			});
		}
		return flag;
	}

	$scope.getSupported = function(argument){
			if($rootScope.currentUser){
		if(checkSupported(argument)){
			return 'green';
		}}
	}
	var checkDisputed = function(argument){
		var email = $rootScope.currentUser.email;
		var flag = false;
		if(argument) {
			angular.forEach(argument.content.disputes, function (value, key) {
				if (JSON.stringify(email) === JSON.stringify(value.s_email)) {
					flag = true;
				}
			});
		}
		console.log('checkdisputed flag'+flag);
		return flag;
	}

	$scope.getDisputed = function(argument){
		if($rootScope.currentUser){
		if(checkDisputed(argument)){
			return 'red';
		}
	}
	}

	var addDebateConn = function() {
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
		console.log('listening to debate room'+$scope.currentDebate._id);
		addDebateConn();
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

	$scope.getAvatarSrc = function(fname,lname,user) {
		if (user) {
		if (typeof user.photourl != 'undefined') {
			return user.photourl;
		} else {

			var initial = fname.slice(0, 1);
			initial += lname.slice(0, 1);
			var src = "http://placehold.it/50/55C1E7/fff&amp;text=";
			return src + initial;
		}
	}
	}


	$scope.addSupport = function(argument,index){
		var user = {};
		user.s_email = $rootScope.currentUser.email;
		user.name = $rootScope.currentUser.fullname;
		var updatedArg = {};
		var api = "";
		if(checkSupported(argument)){
			api = '/saru/arguments/'+argument._id+'/support/remove';
		}else{
			api='/saru/arguments/'+argument._id+'/support/add';
		}
		$http.put(api,user).then(function(response){
			console.log("support added/removed"+api);
			$http.get('/saru/argument/'+argument._id).then(function(response){
				updatedArg = response.data;
				console.log('updated arg'+JSON.stringify(updatedArg));
				if (argument.content.proInd === 'Y') {
					$scope.currentPArgs[index] =  updatedArg;
				}else{
					$scope.currentNArgs[index] =  updatedArg;
				}
			});
		});

		//$scope.$apply();
	}

	$scope.addDispute = function(argument,index){
		var user = {};
		user.s_email = $rootScope.currentUser.email;
		user.name = $rootScope.currentUser.fullname;
		var updatedArg = {};
		var api = "";
		if(checkDisputed(argument)){
			api = '/saru/arguments/'+argument._id+'/dispute/remove';
		}else{
			api='/saru/arguments/'+argument._id+'/dispute/add';
		}
		$http.put(api,user).then(function(response){
			console.log("dispute added/removed"+api);
			$http.get('/saru/argument/'+argument._id).then(function(response){
				updatedArg = response.data;
				console.log('updated arg'+JSON.stringify(updatedArg));
				if (argument.content.proInd === 'Y') {
					$scope.currentPArgs[index] =  updatedArg;
				}else{
					$scope.currentNArgs[index] =  updatedArg;
				}
			});
		});

	}

	$scope.counters = function(argument,index){
console.log("inside counters metod"+JSON.stringify(argument));

		$rootScope.modalArgument = argument;
		$http.post('/saru/arguments/multiple',argument.content.counters).then(function(response){
			console.log("response for counters"+JSON.stringify(response.data));
			$rootScope.counterArgs = response.data;
		});
	}
	$scope.addCounter = function(arg){
		console.log("inside counters metod"+JSON.stringify($scope.modalArgument));
		console.log("inside counters metod"+JSON.stringify(arg));
		var mArg = $rootScope.modalArgument;
		var argument = {};
		argument.debateId =mArg.debateId;
		argument.content = {};
		argument.content.text = arg;
		argument.content.supports = [];
		argument.content.disputes = [];
		argument.content.counters = [];
		if (mArg.content.proInd === 'Y') {
			argument.content.proInd = 'N';
		}else{
			argument.content.proInd = 'Y';
		}
		argument.user={};
		argument.user.email=$rootScope.currentUser.email;
		argument.user.fullname=$rootScope.currentUser.fullname;
		argument.user.firstname = $rootScope.currentUser.firstname;
		argument.user.lastname =$rootScope.currentUser.lastname;
		argument.user.id=$rootScope.currentUser.regUser;
		argument.user.photourl = $rootScope.currentUser.photourl;
		argument.parent = mArg._id;
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
			$scope.counterArg="";
			$http.put('/saru/arguments/'+mArg._id+'/counter/add/'+response.data._id).then(function(response2){
				$scope.$apply();
			});

		});

	}

}]);