'use strict';

function loginController($scope, localStorageService,$location, authService, ngAuthSettings) {

    $scope.init = function () {
        var deviceDetails = _getDeviceDetails();
        $scope.useMicrosoftAccount = true;
        $scope.useGoogleAccount = true;

        if (deviceDetails.platformIsAndroidFamily || deviceDetails.platformIsWindowsFamily){
            if(deviceDetails.platformIsAndroidFamily){
                $scope.useMicrosoftAccount = false;
                $scope.useGoogleAccount = true;
            } 

            if(deviceDetails.platformIsWindowsFamily){
                $scope.useMicrosoftAccount = true;
                $scope.useGoogleAccount = false;
            } 
        }
    }

    $scope.login = function (provider) {
        var microsoftAdditionalParams = "";
        var googleAdditionalParams = "";
        var redirectUri = "";
        var client_id = "";

        var baseUri = ngAuthSettings.apiServiceBaseUri;
        var url = baseUri + "api/Account/ExternalLogin" + "?provider=" + provider
                          + "&response_type=token";

        if (provider == "Microsoft"){
            redirectUri = "https://login.live.com/oauth20_desktop.srf";
            client_id = "00000000441353F7";
            microsoftAdditionalParams = "&redirect_uri=" + redirectUri + "&client_id=" + client_id + "&scope=wl.signin";
            url += microsoftAdditionalParams;
        }

        if (provider == "Google"){
            client_id = "71208806089-r4g4kft9r79uaht4mr1dl4ijn7dlna0f.apps.googleusercontent.com";
            googleAdditionalParams = "&client_id=" + client_id;
            url += googleAdditionalParams;
        }

        cordova.exec(function (response) {}, function (err) {}, "InAppBrowser", "open", [url, '_system', 'location=no']);

        //microsoftAccountAuth();
        /*authService.login(provider).then(function (response){
            window.alert("Success!!!");
        }, function (error) {
            window.alert("Error!!!");
        });*/
    }

    var _getDeviceDetails = function () {
        var platform = window.device.platform
        var details = {
            platformIsAndroidFamily : platform.indexOf("Android") != -1,
            platformIsWindowsFamily : platform.indexOf("Win") != -1
        };

        return details;
    }

    function microsoftAccountAuth() {
                 var inApp = window.open("https://login.live.com/oauth20_authorize.srf?client_id=00000000441353F7&scope=wl.signin&response_type=token&redirect_uri=https://login.live.com/oauth20_desktop.srf", "_blank");
                inApp.addEventListener('loadstart', function(event)
                {
                    if (event.url.indexOf("#access_token") > -1){
                        var startOfAccessToken = event.url.indexOf("#access_token");
                        var endOfAccessToken = event.url.indexOf("&");
                        var accessToken = event.url.substring(startOfAccessToken+14, endOfAccessToken);
                        var userDataLookUpURL = "https://apis.live.net/v5.0/me?access_token=" + accessToken;
 
                    $.ajax({
                      url: userDataLookUpURL
                      }).done(function(response) {
                         var userName = response.first_name + " " + response.last_name;
                         document.getElementById('signInButton').style.display='none';
                          document.getElementById("userInfo").innerText = "Hello " + userName + "!";
                });

                alert('Login success!');
                inApp.close();
              }
           });
        }

    $scope.init();
};
