function parentController($scope, localStorageService,appConstants) {
    $scope.user = {
        name : 'Ilya Kazlou',
        id : "B0432BDE-DBDA-467A-8C5F-20C90BE8E8EF"
    };

    $scope.currentRole = localStorageService.get("currentRole") || appConstants.roles.passengerRoleName;
    $scope.userIsDriver = $scope.currentRole == appConstants.roles.driverRoleName;

    $scope.displayHeader = true;
    $scope.displayFooter = true;

    $scope.changeRole = function () {
        if ($scope.currentRole == appConstants.roles.passengerRoleName){
            localStorageService.set('currentRole', appConstants.roles.driverRoleName);
            $scope.currentRole = appConstants.roles.driverRoleName;
        }else{
            localStorageService.set('currentRole', appConstants.roles.passengerRoleName);
            $scope.currentRole = appConstants.roles.passengerRoleName;
        }
        $scope.userIsDriver = !$scope.userIsDriver;
    };
};