
function mapController($scope, mapService){
    $scope.init = function () {
        mapService.createMap().then(function (position) {
            mapService.updateCurrentUserCoords($scope.user.id, position);
        });
    };

    $scope.init();
}