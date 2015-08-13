
function authenticationController($scope, authService, $location, localStorageService){

    $scope.data = { loginFormIsVisible : true };

    $scope.toggleForm = function (){
        $scope.data.loginFormIsVisible = !$scope.data.loginFormIsVisible;
    };

    $scope.loginFB = function () {
        authService.login('Facebook').then(function (response){
            if (response.isAuthenticated){
                $scope.$emit('onAuthentication', response);
                $location.path('/home');
            }
        });
    };
}