'use strict';
angular.module('app.services')
    .factory('LeaguesService', function ($http, ServerService, $cookieStore) {
        return {
            getAvailableLeagues: function (success, error) {
                $http
                    .get(
                        ServerService.get() + '/leagues/available', {
                            headers: { 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            },
            getSuscribedLeagues: function (success, error) {
                $http
                    .get(
                        ServerService.get() + '/leagues/suscribed', {
                            headers: { 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            },
            updateLeagueInServer: function(leagueModel, success, error) {
                $http
                    .put(
                        ServerService.get() + 'leagues/editleague/' + leagueModel.Id, {
                            headers: { 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function(response) {
                    success(response);
                }).error(error);
            },
            uploadNewLeague: function(leagueModel, success, error) {
                $http
                    .put(
                        ServerService.get() + 'leagues/createleague', {
                            headers: { 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function(response) {
                        success(response);
                    }).error(error);
            },
        };
    });
