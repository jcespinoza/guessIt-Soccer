'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
//var server = 'http://guessitsoccerapi.apphb.com';
var server = 'http://localhost:60166';

angular.module('app.services', [])
    .factory('AccountService', function($http) {
        return {
            login: function(loginModel, success, error) {
                $http
                    .post(server + '/login', loginModel)
                    .success(function(response) {
                        success(response);
                    })
                    .error(error);
            },
            signup: function(signupModel, success, error) {
                $http
                    .post(server + '/signup', signupModel)
                    .success(function(response) {
                        success(response);
                    })
                    .error(error);
            },
            reset: function(resetModel, success, error) {
                $http
                    .post(server + '/resetpassword', resetModel)
                    .success(function(response) {
                        success(response);
                    })
                    .error(error);
            }
        };
    });