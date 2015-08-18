function organizationManagementServiceFactory($http, $q, backendSettings){
    var service = {};
    var baseUri = backendSettings.apiServiceBaseUri;

    var _getUserOrganizations = function (id) {
        var deferred = $q.defer();

        $http.get(baseUri + 'api/AppApi/GetAllUserOrganizations?userId=' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    service.getUserOrganizations = _getUserOrganizations;

    return service;
}
