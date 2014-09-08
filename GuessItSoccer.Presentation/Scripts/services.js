'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])
    .factory('LoginService', function($http) {
    return {
        login: function(loginModel, success, error) {
            $http
                .post('http://guessitsoccerapi.apphb.com/login', loginModel)
                .success(function(response) {
                    success(response);
                })
                .error(error);
        }
    };
    })
    .factory('SignupService', function($http) {
    return {
        signup: function(signupModel, success, error) {
            $http
                .post("http://guessitsoccerapi.apphb.com/signup", signupModel)
                //.post("http://localhost:60166/signup", signupModel)
                .success(function(response) {
                    success(response);
                })
                .error(error);
        }
    };
    });