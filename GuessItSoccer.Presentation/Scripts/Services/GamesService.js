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
    };
});