"use strict";

function webClient(){

	var service = {};

	service.getClient = function (mode) {
        var client = {};

        if (mode == 'debug'){
            client = new WindowsAzure.MobileServiceClient(
                "http://localhost:60560",
                "ztdbGlKMBjYGMAmktkHtbMaHIvplmH23"
            );
        }
        else {
            client = new WindowsAzure.MobileServiceClient(
			    "https://pickmeupmobile.azure-mobile.net/",
			    "ztdbGlKMBjYGMAmktkHtbMaHIvplmH23"
			);
        }

        return client;
    };

    return service;
}