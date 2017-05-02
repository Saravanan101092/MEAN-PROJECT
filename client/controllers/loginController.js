
myApp.controller('LoginController',
    ['$scope', 'Authentication','$location',
        function($scope, Authentication,$location) {
            console.log(Authentication.requireAuth());
            if(Authentication.requireAuth()){
                $location.path('/browseDebates');
            }
            $scope.login = function() {
                console.log("login method");
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

        }]);