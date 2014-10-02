'use strict';
angular.module('app.services')
    .factory('TeamsService', function ($http, ServerService, $cookieStore) {
    return{
        getTeamsForLeague: function (leagueId, success, error) {
                $http
                    .get(
                        ServerService.get() + '/leagues/'+leagueId+'/teams', {
                            headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                        })
                    .success(function (response) {
                        success(response);
                    }).error(error);
        },
        getTeamById: function (leagueId, teamId, success, error) {
            $http
                .get(
                    ServerService.get() + '/leagues/'+leagueId+'/teams/get/'+teamId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        updateTeamInServer: function (leagueId, teamModel, success, error) {
            $http({
                url: ServerService.get() + '/leagues/'+leagueId+'/teams/editteam',
                dataType: 'json',
                method: 'POST',
                data: teamModel,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': $cookieStore.get('access_token')
                }
            })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        uploadNewTeam: function (leagueId, teamModel, success, error) {
            $http({
                url: ServerService.get() + '/leagues/'+leagueId+'/teams/createteam',
                dataType: 'json',
                method: 'POST',
                data: teamModel,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': $cookieStore.get('access_token')
                }
            })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        archiveTeamInServer: function (leagueId, teamId, success, error) {
            $http
                .post(
                    ServerService.get() + '/leagues/'+leagueId+'/teams/deleteteam/'+teamId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        restoreTeamInServer: function (leagueId, teamId, success, error) {
            $http
                .post(
                    ServerService.get() + '/leagues/'+leagueId+'/teams/restoreteam/'+teamId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
    };
});