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

	    //var serviceBase = 'http://localhost:60560/'; //Mobile Service
	    //var serviceBase = 'https://pickmeupmobile.azure-mobile.net/';

	    var serviceBase = 'http://localhost:100/PickMeApp/';
	    //var serviceBase = 'http://pickmeupglobal.azurewebsites.net/';

	    module.constant('backendSettings', {
            apiServiceBaseUri: serviceBase,
            webClient: 'ngAuthApp'
        });

        module.constant('appConstants', {
            roles: { driverRoleName: "Driver", passengerRoleName: "Passenger" }
        });

	    //module.config(function ($httpProvider) {
	        //$httpProvider.interceptors.push('authInterceptorService');
	    //});

	    return module;
	};

	self.initRoutes = function (module) {
		module.config(function ($routeProvider) {

	        $routeProvider.when("/home", {
	            controller: "homeController",
	            templateUrl: "js/app/views/home.html"
	        });

	        $routeProvider.when("/login", {
                controller: "loginController",
                templateUrl: "js/app/views/login.html"
            });

            $routeProvider.when("/map", {
                controller: "mapController",
                templateUrl: "js/app/views/map.html"
            });

	        $routeProvider.otherwise({ redirectTo: "/home" });

	    });
	};

	self.setOnAppReadyAction = function (module) {
		module.run(['$location','localStorageService', function (location,localStorageService) {
            location.path('/home');
            self.initCss();

            return;
            /*Temporarily*/
	        var authData = localStorageService.getItem("authData");
	        if (!authData){
	            location.path('/login');
	        }
	    }]);
	};

	self.initCore = function (module) {
        module.factory("webClient", [webClient]);
        module.factory("backendSettings", ['$http', '$q', 'localStorageService', 'webClient','backendSettings', authServiceFactory]);
        module.factory("mapService", ['$http', '$q', 'backendSettings', mapServiceFactory]);

        module.controller('parentController', ['$scope', 'localStorageService','appConstants', parentController]);
		module.controller('homeController', ['$scope', '$location', homeController]);
    	module.controller('loginController', ['$scope', 'localStorageService','$location', 'authService', 'ngAuthSettings', loginController]);
        module.controller('loginController', ['$scope', "mapService", mapController]);
	};

    self.initCss = function () {
        $(".app").css({
            "background-image" : "none",
            "padding" : "0",
            "position" : "static",
            "margin" : "0",
            "width" : "100%"
        });
    };
}