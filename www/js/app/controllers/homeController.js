'use strict';

function homeController($scope, $location) {

    $scope.buttonClick = function () {
        $location.path('/map');
    };
};