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
            getLeagueById: function (leagueId, success, error) {
                $http
                    .get(
                        ServerService.get() + '/leagues/get/'+leagueId, {
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
            fetchSuscribedUsersFromServer: function(leagueId, succes, error) {
                $http
                    .get(
                        ServerService.get() + '/leagues/' +leagueId+ '/suscribedusers', {
                            headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            },
            updateLeagueInServer: function(leagueModel, success, error) {
                $http({
                        url: ServerService.get() + '/leagues/editleague/' + leagueModel.Id,
                        dataType: 'json',
                        method: 'POST',
                        data: leagueModel,
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': $cookieStore.get('access_token')
                        }
                    })
                    .success(function(response) {
                    success(response);
                }).error(error);
            },
            uploadNewLeague: function(leagueModel, success, error) {
                $http({
                        url: ServerService.get() + '/leagues/createleague',
                        dataType: 'json',
                        method: 'POST',
                        data: leagueModel,
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': $cookieStore.get('access_token')
                        }
                    })
                    .success(function(response) {
                        success(response);
                    }).error(error);
            },
            suscribeToLeague: function(leagueId, success, error) {
                $http({
                        url: ServerService.get() + '/leagues/suscribe/' + leagueId,
                        dataType: 'json',
                        method: 'POST',
                        data: '',
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': $cookieStore.get('access_token')
                        }
                    })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            },
            unsuscribeFromLeague: function(leagueId, success, error) {
                $http({
                    url: ServerService.get() + '/leagues/unsuscribe/' + leagueId,
                    dataType: 'json',
                    method: 'POST',
                    data: '',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': $cookieStore.get('access_token')
                    }
                })
                    .success(function (response) {
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
            },
            restoreLeagueInServer: function(leagueId, success, error) {
                $http
                    .post(
                        ServerService.get() + '/leagues/restoreleague/' + leagueId, {
                            headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
            },
        };
    });
