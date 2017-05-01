app.controller('LoginController',['$http','$scope', '$location','$routeParams',function($http,$scope,$location,$routeParams){
console.log("inside login controller");
 $scope.hideloginform = false;
    if(typeof $routeParams.userId !='undefined'){
        $http.get('/saru/users/'+$routeParams.userId).then(function(response){
           console.log('User from ID after login:'+response);
            $scope.user = response.data;
            $location.path('/');
        });
    }
    $scope.loginWithFB = function(){
        $http.get('/login/facebook').then(function(response){
            $scope.hideloginform = true;
            var content = $('fbcontent');
            content.load(response);
            $compile(htmlcontent.contents())($scope);
            console.log("response for fbauth"+JSON.stringify(response));
            $scope.htmlContentFB = response.data;
        });
    }
}]);