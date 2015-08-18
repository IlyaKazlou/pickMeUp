"use strict";

function authServiceFactory($http, $q, backendSettings, localStorageService, $location){
	var service = {};
    var baseUri = backendSettings.apiServiceBaseUri;

	var _loginExternal = function (provider) {
        var deferred = $q.defer();
        var redirectUri = "http://pickmeupsiteapp.azurewebsites.net/Home/SuccessfulAuthorization";
        //var redirectUri = window.location.href;

        var externalProviderUrl = baseUri + "api/Account/ExternalLogin?provider=" + provider
            + "&response_type=token" + "&redirect_uri=" + redirectUri;

        cordova.exec(function (resp) {
            var url = resp.url || "";
            var token = _getUrlParamValue(url, 'external_access_token');
            if (token){
                var authData = _getAuthObject(resp.url);
                localStorageService.set('authData', authData);
                deferred.resolve(authData);
            };
        }, function (e) {
            console.log(e);
            deferred.resolve({});
        }, "InAppBrowser", "open", [externalProviderUrl, '_blank', 'location=yes']);

        return deferred.promise;
    };

    var _login = function (loginData){
        var deferred = $q.defer();
        var data = "grant_type=password&email=" + loginData.email + "&password=" + loginData.password + "&client_id=" + backendSettings.client + "&userName=guest";
        $http.post(baseUri + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            var authData = {
                token: response.access_token,
                userName: response.userName,
                refreshToken: response.refresh_token,
                useRefreshTokens: true,
                isAuthenticated: true,
                id: response.id
            };

            localStorageService.set('authData', authData);
            deferred.resolve(authData);
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(baseUri + 'api/account/register', registration).then(function (response) {
            return response;
        });
    };

    var _getAuthObject = function (url) {
        var obj = {};
        obj.token = _getUrlParamValue(url, 'external_access_token');
        obj.userName = _getUrlParamValue(url, 'external_user_name');
        obj.provider = _getUrlParamValue(url, 'provider');
        obj.isAuthenticated = true;
        return obj;
    };

    var _getUrlParamValue = function (url, param, asArray) {
        if (!url) return "";

        var paramIndex = url.indexOf(param);

        if (paramIndex == -1) return "";

        var result = url.substring(paramIndex);
        var stringPair = result.split('&')[0];
        var value = stringPair.split('=')[1];
        return value;
    };

    var _logOut = function () {
        $location.replace();
        localStorageService.set('authData', {});
    };

    service.login = _login;
	service.loginExternal = _loginExternal;
    service.logOut = _logOut;
    service.saveRegistration = _saveRegistration;

	return service;
};