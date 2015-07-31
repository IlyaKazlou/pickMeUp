
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
        }, 500);
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

