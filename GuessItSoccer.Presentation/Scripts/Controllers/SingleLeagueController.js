'user strict';
angular.module('app.controllers')
// Path /league/#
.controller('SingleLeagueCtrl', [
    '$scope', '$location', '$window', '$stateParams', 'TeamsService', function ($scope, $location, $window, $stateParams, TeamsService) {
        $scope.$root.title = 'GuessIt Soccer | League';
        console.log("Incoming league ID: " + $stateParams.id);
        $scope.currentLeagueID = $stateParams.id;

        $scope.gamesFilter = [];

        $scope.isEditing = false;
        //API
        $scope.teams = [];
        $scope.games = [];
        $scope.teamForUpdate = {};
        $scope.newTeam = {};

        $scope.loadTeams = function() {
            TeamsService.getTeamsForLeague($scope.currentLeagueID, function(response) {
                $scope.teams = response;
            }, function(error) {
                console.log(error);
            });
        }
        $scope.loadTeams();

        $scope.editTeam = function (team) {
            $scope.isEditing = true;
            $scope.teamForUpdate = team;
        }

        $scope.cancelEditTeam = function () {
            $scope.isEditing = false;
        }

        $scope.updateTeam = function (){
            TeamsService.updateTeamInServer($scope.currentLeagueID, $scope.teamForUpdate, function(response) {
                $scope.loadTeams();
                $scope.isEditing = false;
            }, function(error) {
                console.log(error);
            });
        };

        $scope.addNewTeam = function () {
            TeamsService.uploadNewTeam($scope.currentLeagueID, $scope.newTeam, function (response) {
                $scope.loadTeams();
                $scope.newTeam = {};
            }, function (error) {
                console.log(error);
            });
        };

        $scope.deleteTeam = function (team) {
            TeamsService.archiveTeamInServer($scope.currentLeagueID, team.Id, function (response) {
                $scope.loadTeams();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.setTeamEnabled = function (team, value) {
            if (value) {
                TeamsService.restoreLeagueInServer($scope.currentLeagueID, team.Id, function (response) {
                    $scope.loadTeams();
                }, function (error) {
                    console.log(error);
                });
            } else {
                $scope.deleteTeam(team);
            }
        };

        $scope.gameEditing = "";
        $scope.editGame = function (team1, team2, lid) {
            $scope.isEditingGame = true;
            $scope.oldTeam1 = team1;
            $scope.oldTeam2 = team2;
            $scope.editingTeam1 = team1;
            $scope.updatedTeam2 = team2;
        }

        

        $scope.cancelEditGame = function () {
            $scope.isEditingGame = false;
        }

        

        $scope.addNewGame = function (t1, t2) {
            var nid = $scope.games[$scope.games.length - 1].id + 1;

            $scope.games.push(
                { leagueID: parseInt($stateParams.id), id: nid, team1: t1.teamID, team2: t2.teamID, IsArchived: true, date: new Date() }
            );
            cleanLists();
            editingTeam1 = {};
            t2 = {};
        };

        $scope.getTeamsByLeagueId = function (lid) {
            var teams = [];
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].leagueID === currentLeagueID)
                    teams.push($scope.teams[i]);
            }
            return teams;
        };


        var cleanLists = function () {
            $scope.teamsFilter = [];
            $scope.gamesFilter = [];
            for (var i = 0; i < $scope.teams.length; i++)
                if ($scope.teams[i].leagueID.toString() === $stateParams.id)
                    $scope.teamsFilter.push($scope.teams[i]);

            for (var i = 0; i < $scope.games.length; i++)
                if ($scope.games[i].leagueID.toString() === $stateParams.id)
                    $scope.gamesFilter.push($scope.games[i]);
        };

        
        $scope.setGameEnabled = function (game, value) {
            game.IsArchived = value;
        };

        

        $scope.deleteGame = function (gameID) {
            for (var i = 0; i < $scope.games.length; i++) {
                if ($scope.games[i].id === gameID)
                    $scope.games.splice(i, 1);
            }
            cleanLists();
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
]);

