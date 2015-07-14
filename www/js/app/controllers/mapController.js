
function mapController($scope, mapService){
    $scope.data = {};

    $scope.init = function () {
        mapService.createMap().then(function (data) {
            $scope.data.map = data.map;
            mapService.updateCurrentUserCoords($scope.user.id, data.position).then(function () {
                mapService.addSubscribersToMap($scope.user.id,$scope.user.currentRole, $scope.data.map);
            });
        });
    };

    $scope.init();
}