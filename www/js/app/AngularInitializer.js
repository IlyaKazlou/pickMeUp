'use strict';

function AngularInitializer(options){
	var self = this;
	self.bootstrapId = options.bootstrapId;
	self.moduleName = options.moduleName;

	self.init = function () {
		var module = self.getModule();
		self.initRoutes(module);
		self.setOnAppReadyAction(module);
		self.initCore(module);

		angular.bootstrap($("#" + self.bootstrapId), [self.moduleName]);
	};

	self.getModule = function () {
		var module = angular.module(self.moduleName, ['ngRoute', 'LocalStorageModule']);

	    //var serviceBase = 'http://localhost:100/PickMeApp/';
	    var serviceBase = 'http://pickmeupsiteapp.azurewebsites.net/';

	    module.constant('backendSettings', {
            apiServiceBaseUri: serviceBase,
            webClient: 'ngAuthApp'
        });

        module.constant('appConstants', {
            roles: { driverRoleName: "Driver", passengerRoleName: "Passenger" }
        });

        module.factory('authInterceptorService',['$q', '$injector','$location', 'localStorageService', authInterceptorServiceFactory]);

	    module.config(function ($httpProvider) {
	        $httpProvider.interceptors.push('authInterceptorService');
	    });

	    return module;
	};

	self.initRoutes = function (module) {
		module.config(function ($routeProvider) {

	        $routeProvider.when("/home", {
	            controller: "homeController",
	            templateUrl: "js/app/views/home.html"
	        });

            $routeProvider.when("/map", {
                controller: "mapController",
                templateUrl: "js/app/views/map.html"
            });

            $routeProvider.when("/login", {
                controller: "loginController",
                templateUrl: "js/app/views/login.html"
            });

            $routeProvider.otherwise({
                controller: "exitAppController",
                templateUrl: "js/app/views/exitApp.html"
            });
	    });
	};

	self.setOnAppReadyAction = function (module) {
		module.run(['$location','localStorageService', function (location,localStorageService) {
            self.initCss();

	        var authData = localStorageService.get("authData");
	        if (!authData || !authData.isAuthenticated){
	            location.path('/login');
	        }else{
                location.path('/home');
            }
	    }]);
	};

	self.initCore = function (module) {
        module.factory("mapService", ['$http', '$q', 'backendSettings', mapServiceFactory]);
        module.factory("authService", ['$http', '$q', 'backendSettings', 'localStorageService', '$location', authServiceFactory]);

        module.controller('parentController', ['$scope', 'localStorageService','appConstants', 'authService', '$location', '$rootScope', parentController]);
		module.controller('homeController', ['$scope', '$location', 'localStorageService', homeController]);
        module.controller('mapController', ['$scope', "mapService", mapController]);
        module.controller('loginController', ['$scope', "authService", "$location", 'localStorageService', '$location',loginController]);
        module.controller('exitAppController', ['$scope', "$timeout", exitAppController]);
	};

    self.initCss = function () {
        $(".app").css({
            "background-image" : "none",
            "padding" : "0",
            "position" : "static",
            "margin" : "0",
            "width" : "100%",
            "height" : window.innerHeight + "px"
        });
    };
}