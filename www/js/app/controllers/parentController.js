function parentController($scope, localStorageService,appConstants, authService) {
    var currentRole = localStorageService.get("currentRole") || appConstants.roles.passengerRoleName;

    $scope.user = {
        name : 'Ilya Kazlou',
        id : "0474EB2C-E6E7-4A24-8E5C-0718FB9ED906",
        currentRole : currentRole,
        userIsDriver : currentRole == appConstants.roles.driverRoleName
    };

    $scope.displayHeader = true;
    $scope.displayFooter = true;

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

    $scope.loginFB = function () {
        authService.login('Facebook');
    };
};