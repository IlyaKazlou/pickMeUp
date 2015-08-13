function parentController($scope, localStorageService,appConstants, authService, $location, $rootScope) {
    $scope.init = function () {
        $scope.user = $scope.getUserObject();
    };

    $scope.changeRole = function () {
        if ($scope.user.currentRole == appConstants.roles.passengerRoleName){
            localStorageService.set('currentRole', appConstants.roles.driverRoleName);
            $scope.user.currentRole = appConstants.roles.driverRoleName;
        }else{
            localStorageService.set('currentRole', appConstants.roles.passengerRoleName);
            $scope.user.currentRole = appConstants.roles.passengerRoleName;
        }
        $scope.user.userIsDriver = !$scope.user.userIsDriver;
    };

    $scope.logOff = function () {
        authService.logOut();
        $scope.user.authData = { isAuthenticated : false };
        $scope.user.isUserLoggedOff = true;
        $location.path('/login');
    };

    $scope.$on('$routeChangeStart', function(event, next, current) {
        if(!$scope.user.authData.isAuthenticated && $scope.user.isUserLoggedOff){
            event.preventDefault();
            if (current.$$route.originalPath.indexOf('login') != -1) {
                $location.path('/exitApp');
            }else{
                $location.path('/login');
            }
        }

        if ($scope.user.authData.isAuthenticated){
            if (next.$$route.originalPath.indexOf('login') != -1) {
                event.preventDefault();
                $location.replace();
                $location.path('/home');
            }
        }
    });

    $scope.$on('onAuthentication', function (){
        $scope.user = $scope.getUserObject();
        $scope.user.isUserLoggedOff = false;
    });

    $scope.getUserObject = function () {
        var currentRole = localStorageService.get("currentRole") || appConstants.roles.passengerRoleName;
        var authData = localStorageService.get("authData") || { isAuthenticated : false };

        var user = {
            currentRole : currentRole,
            userIsDriver : currentRole == appConstants.roles.driverRoleName,
            authData: authData,
            name: decodeURIComponent(authData.userName) || ""
        };

        return user;
    };

    $scope.init();
};