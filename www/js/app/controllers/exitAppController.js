'use strict';

function exitAppController($scope, $timeout) {
    $scope.init = function () {
        $timeout(function () { navigator.app.exitApp(); }, 1000);
    };

    $scope.init();
}

