
function mapController($scope, mapService){
    $scope.init = function () {
        mapService.createMap();
    }

    $scope.init();
}