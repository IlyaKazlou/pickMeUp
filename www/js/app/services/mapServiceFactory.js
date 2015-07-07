function mapServiceFactory($http, $q, backendSettings){
    var service = {};
    var baseUri = backendSettings.apiServiceBaseUri;

    var _createMap = function (Map, Placemark, addModulesToGlobalScope) {
        var deferred = $q.defer();

        if (addModulesToGlobalScope) {
            ymaps.Map = Map;
            ymaps.Placemark = Placemark;
        }

        $("#map").height(window.innerHeight);

        _getCurrentPosition().then(function (position) {
            var map = new ymaps.Map('map', {
                center: [position.coords.latitude, position.coords.longitude],
                zoom: 15
            });

            placemark = new ymaps.Placemark([position.coords.latitude, position.coords.longitude]);
            map.geoObjects.add(placemark);
            deferred.resolve(position)
        });

        return deferred.promise;
    };

    var _getCurrentPosition = function () {
        var deferred = $q.defer();
        navigator.geolocation.getCurrentPosition(function (position) {
            deferred.resolve(position);
        }, function (error) {
            deferred.resolve(error);
        });

        return deferred.promise;
    };

    var _updateCurrentUserCoords = function (id, position) {
        var deferred = $q.defer();
        var request = { Latitude: position.coords.latitude,  Longitude: position.coords.longitude, UserId: id };
        $http.post(baseUri + "api/AppApi/AddPoint", request).success(function (response) {
            deferred.resolve(response);
        }).error(function (e){
            deferred.reject(e);
        });
    };

    service.createMap = function () {
        var deferred = $q.defer();
        if (!ymaps.Map) {
            ymaps.modules.require('Map, Placemark', function (Map, Placemark) {
                return _createMap(Map, Placemark, true)
            });
        }else{
            return _createMap(ymaps.Map, ymaps.Placemark)
        }
    };

    service.updateCurrentUserCoords = _updateCurrentUserCoords;

    return service;
};
