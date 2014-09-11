'use strict';
angular.module('app.services')
    .factory('AccountService', function ($http, ServerService) {
        return {
            login: function (loginModel, success, error) {
                $http
                    .post(
                        ServerService.get() + '/login', loginModel)
                    .success(function (response) {
                        success(response);
                    })
                    .error(error);
            },
            signup: function (registerModel, success, error) {
                $http
                    .post(
                        ServerService.get() + '/signup', registerModel)
                    .success(function (response) {
                        success(response);
                    })
                    .error(error);
            }
        };
    });
