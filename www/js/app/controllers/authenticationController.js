
function authenticationController($scope, authService, $location, $timeout){

    $scope.data = {
        loginFormIsVisible : true,
        registration: {
            userName: "",
            password: "",
            confirmPassword: "",
            email: ""
        }
    };

    $scope.toggleForm = function (){
        $scope.data.loginFormIsVisible = !$scope.data.loginFormIsVisible;
    };

    $scope.signUp = function () {
        authService.saveRegistration($scope.data.registration).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();
        }, function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            $scope.message = "Failed to register user due to:" + errors.join(' ');
        });
    };

    $scope.loginFB = function () {
        authService.login('Facebook').then(function (response){
            if (response.isAuthenticated){
                $scope.$emit('onAuthentication', response);
                $location.path('/home');
            }
        });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $scope.toggleForm();
        }, 2000);
    }
}