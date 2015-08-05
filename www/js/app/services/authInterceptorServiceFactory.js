'use strict';
function authInterceptorServiceFactory ($q, $injector,$location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {
        return config;
    };

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            authService.logOut();
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
};