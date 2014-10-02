'use strict';
angular.module('app.services')
    .factory('GamesService', function ($http, ServerService, $cookieStore) {
    return {
        getGamesForLeague: function (leagueId, success, error) {
            $http
                .get(
                    ServerService.get() + '/leagues/' + leagueId + '/games', {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        getGameById: function (leagueId, gameId, success, error) {
            $http
                .get(
                    ServerService.get() + '/leagues/' + leagueId + '/games/get/' + gameId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        updateGameInServer: function (leagueId, gameModel, success, error) {
            $http({
                url: ServerService.get() + '/leagues/' + leagueId + '/games/editgame',
                dataType: 'json',
                method: 'POST',
                data: gameModel,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': $cookieStore.get('access_token')
                }
            })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        uploadGameToServer: function (leagueId, gameModel, success, error) {
            $http({
                url: ServerService.get() + '/leagues/'+leagueId+'/games/creategame',
                dataType: 'json',
                method: 'POST',
                data: gameModel,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': $cookieStore.get('access_token')
                }
            })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        archiveGameInServer: function (leagueId, gameId, success, error) {
            $http
                .post(
                    ServerService.get() + '/leagues/'+leagueId+'/games/deletegame/'+gameId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        restoreGameInServer: function (leagueId, gameId, success, error) {
            $http
                .post(
                    ServerService.get() + '/leagues/' + leagueId + '/games/restoregame/' + gameId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        assignResultToGame: function (leagueId, gameModel, success, error) {
            gameModel.complete = true;
            $http({
                url: ServerService.get() + '/leagues/'+leagueId+'/games/'+gameModel.Id+'/assignresult',
                dataType: 'json',
                method: 'POST',
                data: gameModel.Result,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': $cookieStore.get('access_token')
                }
            })
            .success(function (response) {
                success(response);
            }).error(error);
        }
    };
});