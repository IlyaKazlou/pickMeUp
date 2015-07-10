
function mapController($scope, mapService){
    $scope.init = function () {
        mapService.createMap().then(function (position) {
            mapService.updateCurrentUserCoords($scope.user.id, position).then(function () {
                mapService.addSubscribersToMap($scope.user.id,$scope.user.currentRole);
            });
        });
    };

    $scope.init();
}