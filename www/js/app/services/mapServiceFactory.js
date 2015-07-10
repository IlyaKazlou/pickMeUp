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

    var _getSubscribers = function (id, currentUserRole){
        var deferred = $q.defer();
        var request = { "UserId": id, "CurrentUserRole": currentUserRole};
        $http.post(baseUri + "api/AppApi/GetUserSubscribers", request).success(function (response) {
            deferred.resolve(response);
        }).error(function (e){
            deferred.reject(e);
        });

        return deferred.promise;
    };

    var _addSubscribersToMap = function (userId, currentUserRole) {
        _getSubscribers(userId, currentUserRole).then(function (subscribers){
            if (subscribers) return;
            for (var i = 0; i < subscribers.length; i++){
                var latestPoint = subscribers[i].LatestPoint;
                if (latestPoint)
                {
                    var placemark = new ymaps.Placemark([latestPoint.Latitude, latestPoint.Longitude]);
                    map.geoObjects.add(placemark);
                }
            }
        });
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

        return deferred.promise;
    };

    var _getUrlParams = function (params){
        var str ="?";
        for (var i = 0; i < params.length; i++){
            for(var prop in params[i]){
                str += prop + "=" + params[i][prop];
            }

            str += (i < params.length - 1) ? "&" : "";
        }
        return str;
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

    service.getSubscribers = _getSubscribers;

    service.addSubscribersToMap = _addSubscribersToMap;

    return service;
};
