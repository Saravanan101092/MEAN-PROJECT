
myApp.controller('LoginController',
    ['$scope', 'Authentication','$location',
        function($scope, Authentication,$location) {
             console.log("LoginController");         
            $scope.login = function() {
                console.log("login method"+JSON.stringify($scope.user));
                Authentication.login($scope.user);
            };

            $scope.logout = function() {
                console.log("logout method");
                Authentication.logout();
            };

            $scope.register = function() {
                console.log("registration method");
                Authentication.register($scope.user);
            }; //register

            $scope.loginWithFB = function(){
                console.log("FB login");
                Authentication.fbLogin();
            };

            $scope.checkpass = function(a,b){
                if(a==b){
                    return false;
                }else{
                    return true;
                }
            }
        }]);