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

	    //var serviceBase = 'http://localhost:54205/';
	    var serviceBase = 'http://pickmeupglobal.azurewebsites.net/';

	    module.constant('ngAuthSettings', {
	        apiServiceBaseUri: serviceBase,
	        webClient: 'ngAuthApp'
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

	        $routeProvider.otherwise({ redirectTo: "/home" });

	    });
	};

	self.setOnAppReadyAction = function (module) {
		module.run(['$location','localStorageService', function (location,localStorageService) {
	        var authData = localStorageService.get("authData");
	        if (!authData){
	            location.path('/login');
	        }
	    }]);
	};

	self.initCore = function (module) {
		module.controller('homeController', ['$scope', homeController]);
    	module.controller('loginController', ['$scope', 'localStorageService','$location', 'authService', 'ngAuthSettings', loginController]);

    	module.factory("webClient", [webClient]);
    	module.factory("authService", ['$http', '$q', 'localStorageService', 'webClient','ngAuthSettings', authService]);
	};
}