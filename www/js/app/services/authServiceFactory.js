"use strict";

function authServiceFactory($http, $q, localStorageService, webClient, backendSettings){

	var service = {};

	//var client = webClient.getClient('release');

	var _login = function (provider) {
		var deferred = $q.defer();
		var baseUri = backendSettings.apiServiceBaseUri;

		$http.post(baseUri + "api/Account/ExternalLogin", { Provider: provider }).success(function (response) {
			deferred.resolve(response);
		}).error(function (e){
			deferred.reject(e);
		});

		return deferred.promise;
	}
/*
	var _login = function (provider) {
		var deferred = $q.defer();

		client.login(provider).then(function (results) {
            deferred.resolve(results);
        }, function (error) {
            deferred.reject(error);
        });

		return deferred.promise;
	}*/

	service.login = _login;

	return service;
};