"use strict";

function authServiceFactory($http, $q, backendSettings){
	var service = {};
    var baseUri = backendSettings.apiServiceBaseUri;

	var _login = function (provider) {
        var redirectUri = "http://pickmeupsiteapp.azurewebsites.net/Home/SuccessfulAuthorization";
        //var redirectUri = window.location.href;

        var externalProviderUrl = baseUri + "api/Account/ExternalLogin?provider=" + provider
            + "&response_type=token" + "&redirect_uri=" + redirectUri;

        cordova.exec(function (resp) {
            window.alert('Success');
        }, function (e) {
            console.log(e);
        }, "InAppBrowser", "open", [externalProviderUrl, '_blank', 'location=yes']);
    };

	service.login = _login;

	return service;
};