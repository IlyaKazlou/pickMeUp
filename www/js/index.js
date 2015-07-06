
function MobileApp(ngInitializer){
    var self = this;
    self.ngInitializer = ngInitializer;
    window.device = {platform: 'any'};

    self.initialize = function () {
        self.bindEvents();
    };

    self.bindEvents = function () {
        document.addEventListener('deviceready', self.onDeviceReady, false);
    };

    self.onDeviceReady = function () {
        window.setTimeout(function () {
            mobileApp.receivedEvent('deviceready');
            ngInitializer.init();
        }, 1500);
    };

    self.receivedEvent = function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    };
}

var angularInitializer = new AngularInitializer({ moduleName: "AngularPickMeUpApp", bootstrapId: "app"});
var mobileApp = new MobileApp(angularInitializer);
mobileApp.initialize();


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
/*
        function googleAccountAuth() {
                 var inApp = window.open("https://pickmeupmobile.azure-mobile.net/login/google?completion_type=postMessage&completion_origin=*", "_blank");
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
        }*/

        /*

        hello.init({ 
            windows  : '00000000441353F7',
            google   : '71208806089-r4g4kft9r79uaht4mr1dl4ijn7dlna0f.apps.googleusercontent.com'
        }, { redirect_uri: "https://login.live.com/oauth20_desktop.srf",response_type:"code" });

        hello.on('auth.login', function(auth){
            hello( auth.network ).api( '/me' ).then( function(r){
                // Inject it into the container
                var label = document.getElementById( "profile_"+ auth.network );
                if(!label){
                    label = document.createElement('div');
                    label.id = "profile_"+auth.network;
                    document.getElementById('profile').appendChild(label);
                }
                label.innerHTML = '<img src="'+ r.thumbnail +'" /> Hey '+r.name;
            });

            log(r);
    });

*/