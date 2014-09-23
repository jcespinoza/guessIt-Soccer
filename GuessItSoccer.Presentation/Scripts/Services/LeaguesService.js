'use strict';
angular.module('app.services')
    .factory('LeaguesService', function ($http, ServerService, $cookieStore) {
        return {
            getAvailableLeagues: function (success, error) {
                $http
                    .get(
                        ServerService.get() + '/leagues/available', {
                            headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            },
            getSuscribedLeagues: function (success, error) {
                $http
                    .get(
                        ServerService.get() + '/leagues/suscribed', {
                            headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            },
            updateLeagueInServer: function(leagueModel, success, error) {
                $http
                    ({
                        url: ServerService.get() + '/leagues/editleague/' + leagueModel.Id,
                        dataType: 'json',
                        method: 'POST',
                        data: leagueModel,
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': $cookieStore.get('access_token')
                        }
                    }
                    /*.post(
                        
                        /*
                        ServerService.get() + '/leagues/editleague/' + leagueModel.Id, {
                            data: leagueModel,
                            headers: {"Content-Type": "application/json",
                                 'Authorization': $cookieStore.get('access_token')
                            }
                        }
                        */
                        )
                    .success(function(response) {
                    success(response);
                }).error(error);
            },
            uploadNewLeague: function(leagueModel, success, error) {
                $http
                    .post(
                        ServerService.get() + '/leagues/createleague', {
                            headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function(response) {
                        success(response);
                    }).error(error);
            },
            archiveLeagueInServer: function(leagueId, success, error) {
                $http
                    .post(
                        ServerService.get() + '/leagues/deleteleague/' + leagueId, {
                            headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            }
        };
    });
