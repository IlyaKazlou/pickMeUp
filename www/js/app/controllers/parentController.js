function parentController($scope, localStorageService,appConstants) {
    $scope.userName = 'Ilya Kazlou';
    $scope.currentRole = localStorageService.get("currentRole") || appConstants.roles.passengerRoleName;

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
    };

    $scope.toggleFooter = function (){
        $scope.displayFooter = !$scope.displayFooter;
    };
};