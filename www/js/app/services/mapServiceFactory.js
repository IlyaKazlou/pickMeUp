function mapServiceFactory($http, $q){
    var service = {};

    var _createMap = function (Map, Placemark, addModulesToGlobalScope) {
        if (addModulesToGlobalScope) {
            ymaps.Map = Map;
            ymaps.Placemark = Placemark;
        }

        $("#map").height(window.innerHeight);

        var map = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 15
        });

        placemark = new ymaps.Placemark([55.55, 37.00]);
        map.geoObjects.add(placemark);
    };

    service.createMap = function () {
        if (!ymaps.Map) {
            ymaps.modules.require('Map, Placemark', function (Map, Placemark) {
                _createMap(Map, Placemark, true);
            });
        }else{
            _createMap(ymaps.Map, ymaps.Placemark);
        }
    };

    return service;
};
