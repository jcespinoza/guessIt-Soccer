﻿'use strict';
angular.module('app.services')
    .factory('LeaguesService', function ($http, ServerSerive, $cookieStore) {
            return {
                getAvailableLeagues: function (success, error) {
                        $http
                            .get(
                                ServerSerive.get() + '/leagues/available', {
                                        Authorization: $cookieStore.get('access_token')
                                })
                        .success(function (response) {
                                success(response);
                            })
                        .error(error);
                }
            
        };
    });
