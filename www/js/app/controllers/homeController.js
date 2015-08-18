'use strict';

function homeController($scope, $location, localStorageService, organizationManagementService) {
    $scope.init = function () {
        organizationManagementService.getUserOrganizations($scope.user.id).then(function (organizations) {
            $scope.organizations = organizations;
        });
    };

    $scope.init();
};