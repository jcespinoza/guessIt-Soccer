'use strict';
angular.module('app.services')
    .factory('AccountService', function ($http, Server) {
        return {
            login: function (loginModel, success, error) {
                $http
                    .post(
                        Server.get() + '/login', loginModel)
                    .success(function (response) {
                        success(response);
                    })
                    .error(error);
            },
            signup: function (registerModel, success, error) {
                $http
                    .post(
                        Server.get() + '/signup', registerModel)
                    .success(function (response) {
                        success(response);
                    })
                    .error(error);
            }
        };
    });
