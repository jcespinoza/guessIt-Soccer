'use strict';
angular.module('app.services')
.factory('ServerService', function () {
    return {
        get: function () {
            var server = '';
            if (window.location.host.indexOf('localhost') > -1) {
                //server = 'http://localhost:60166';
                server = 'http://guessitsoccerapi.apphb.com';
            } else if (window.location.host.indexOf('apphb') > -1) {
                server = 'http://guessitsoccerapi.apphb.com';
            }
            return server;
        }
    };
});
