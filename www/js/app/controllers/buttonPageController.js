'use strict';

function buttonPageController($scope, $location, localStorageService) {
    $scope.init = function () {
        var authData = localStorageService.get("authData");
        if (!authData || !authData.isAuthenticated) {
            $scope.$emit("onAuthentication", authData);
        }
    };

    $scope.buttonClick = function () {
        $location.path('/map');
    };

    $scope.init();
};