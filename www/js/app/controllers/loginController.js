
function loginController($scope, authService, $location, localStorageService){
    $scope.loginFB = function () {
        authService.login('Facebook').then(function (response){
            if (response.isAuthenticated){
                $scope.$emit('onAuthentication', response);
                $location.path('/home');
            }
        });
    };
}