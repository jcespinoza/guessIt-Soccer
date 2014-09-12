'user strict';
angular.module('app.controllers')
// Path /league/#
.controller('SingleLeagueCtrl', [
    '$scope', '$location', '$window', '$stateParams', function ($scope, $location, $window, $stateParams) {
        $scope.$root.title = 'GuessIt Soccer | League';
        console.log("Incoming league ID: " + $stateParams.id);
        $scope.currentLeagueID = $stateParams.id;

        $scope.teamsFilter = [];
        $scope.gamesFilter = [];

        $scope.teams = [
            { leagueID: 1, teamID: 1, Name: "Real Madrid FC", IsArchived: true },
            { leagueID: 1, teamID: 2, Name: "FC Barcelona", IsArchived: true },
            { leagueID: 1, teamID: 3, Name: "Atletico Madrid", IsArchived: true },
            { leagueID: 1, teamID: 4, Name: "Valencia", IsArchived: true },
            { leagueID: 1, teamID: 5, Name: "Villareal", IsArchived: true },
            { leagueID: 1, teamID: 6, Name: "Sevilla FC", IsArchived: true },
            { leagueID: 1, teamID: 7, Name: "Real Sociedad", IsArchived: true },
            { leagueID: 1, teamID: 8, Name: "Malaga", IsArchived: true },
            { leagueID: 2, teamID: 1, Name: "Manchester United", IsArchived: true },
            { leagueID: 2, teamID: 2, Name: "Chealsea FC", IsArchived: true },
            { leagueID: 2, teamID: 3, Name: "Everton", IsArchived: true },
            { leagueID: 2, teamID: 4, Name: "Arsenal", IsArchived: true },
            { leagueID: 2, teamID: 5, Name: "Manchester City", IsArchived: true },
            { leagueID: 2, teamID: 6, Name: "Liverpool", IsArchived: true },
            { leagueID: 2, teamID: 7, Name: "Tottenham Hotspur", IsArchived: true },
            { leagueID: 2, teamID: 8, Name: "New Castle", IsArchived: true },
            { leagueID: 3, teamID: 2, Name: "Roma", IsArchived: true },
            { leagueID: 3, teamID: 1, Name: "Juventus", IsArchived: true },
            { leagueID: 3, teamID: 3, Name: "AC Milan", IsArchived: true },
            { leagueID: 3, teamID: 4, Name: "Internazionale", IsArchived: true },
            { leagueID: 3, teamID: 5, Name: "Caigliari", IsArchived: true },
            { leagueID: 3, teamID: 6, Name: "Lazio", IsArchived: true },
            { leagueID: 3, teamID: 7, Name: "Palermo", IsArchived: true },
            { leagueID: 3, teamID: 8, Name: "Torino", IsArchived: true },
            { leagueID: 4, teamID: 1, Name: "Bayern München", IsArchived: true },
            { leagueID: 4, teamID: 2, Name: "borussia Dortmund", IsArchived: true },
            { leagueID: 4, teamID: 3, Name: "Schalke 04", IsArchived: true },
            { leagueID: 4, teamID: 4, Name: "Hannover 96", IsArchived: true },
            { leagueID: 4, teamID: 5, Name: "Stuttgart", IsArchived: true },
            { leagueID: 4, teamID: 6, Name: "Wolfsburg", IsArchived: true },
            { leagueID: 4, teamID: 7, Name: "Werder Bremen", IsArchived: true },
            { leagueID: 4, teamID: 8, Name: "Köln", IsArchived: true },
            { leagueID: 5, teamID: 1, Name: "Olimpia", IsArchived: true },
            { leagueID: 5, teamID: 2, Name: "Platense", IsArchived: true },
            { leagueID: 5, teamID: 3, Name: "Marathon", IsArchived: true },
            { leagueID: 5, teamID: 4, Name: "Parrillas One", IsArchived: true },
            { leagueID: 5, teamID: 5, Name: "Real España", IsArchived: true },
            { leagueID: 5, teamID: 6, Name: "Honduras Progreso", IsArchived: true },
            { leagueID: 5, teamID: 7, Name: "Vida", IsArchived: true },
            { leagueID: 5, teamID: 8, Name: "Victoria", IsArchived: true }
        ];

        $scope.games = [
            { id: 1, leagueID: 1, team1: 4, team2: 5, date: new Date(), IsArchived: true },
            { id: 2, leagueID: 1, team1: 1, team2: 6, date: new Date(), IsArchived: true },
            { id: 3, leagueID: 1, team1: 3, team2: 7, date: new Date(), IsArchived: true },
            { id: 4, leagueID: 1, team1: 2, team2: 8, date: new Date(), IsArchived: true },
            { id: 11, leagueID: 2, team1: 4, team2: 5, date: new Date(), IsArchived: true },
            { id: 12, leagueID: 2, team1: 1, team2: 6, date: new Date(), IsArchived: true },
            { id: 13, leagueID: 2, team1: 3, team2: 7, date: new Date(), IsArchived: true },
            { id: 14, leagueID: 2, team1: 2, team2: 8, date: new Date(), IsArchived: true },
            { id: 21, leagueID: 3, team1: 4, team2: 5, date: new Date(), IsArchived: true },
            { id: 22, leagueID: 3, team1: 1, team2: 6, date: new Date(), IsArchived: true },
            { id: 23, leagueID: 3, team1: 3, team2: 7, date: new Date(), IsArchived: true },
            { id: 24, leagueID: 3, team1: 2, team2: 8, date: new Date(), IsArchived: true },
            { id: 31, leagueID: 4, team1: 4, team2: 5, date: new Date(), IsArchived: true },
            { id: 32, leagueID: 4, team1: 1, team2: 6, date: new Date(), IsArchived: true },
            { id: 33, leagueID: 4, team1: 3, team2: 7, date: new Date(), IsArchived: true },
            { id: 34, leagueID: 4, team1: 2, team2: 8, date: new Date(), IsArchived: true },
            { id: 41, leagueID: 5, team1: 4, team2: 5, date: new Date(), IsArchived: true },
            { id: 42, leagueID: 5, team1: 1, team2: 6, date: new Date(), IsArchived: true },
            { id: 43, leagueID: 5, team1: 3, team2: 7, date: new Date(), IsArchived: true },
            { id: 44, leagueID: 5, team1: 2, team2: 8, date: new Date(), IsArchived: true }
        ];

        $scope.getTeam = function (id) {
            for (var i = 0; i < $scope.teams.length; i++)
                if ($scope.teams[i].teamID.toString() === id && $scope.teams[i].leagueID.toString() === $stateParams.id)
                    return $scope.teams[i];
        }

        $scope.getTeamByName = function (name) {
            for (var i = 0; i < $scope.teams.length; i++)
                if ($scope.teams[i].Name === name && $scope.teams[i].leagueID.toString() === $stateParams.id)
                    return $scope.teams[i];
        }

        $scope.isEditing = false;
        $scope.newTeamName = "";
        $scope.updatedName = "";

        $scope.isEditingGame = false;
        $scope.newTeam1 = "";
        $scope.newTeam2 = "";
        $scope.updatedName = "";

        $scope.oldTeamName = "";
        $scope.editTeam = function (teamName) {
            $scope.isEditing = true;
            $scope.oldTeamName = teamName;
            $scope.updatedName = teamName;
        }

        $scope.oldTeam1 = {};
        $scope.oldTeam2 = {};
        $scope.editingTeam1 = {};
        $scope.updatedTeam2 = "";
        $scope.gameEditing = "";
        $scope.editGame = function (team1, team2, lid) {
            $scope.isEditingGame = true;
            $scope.oldTeam1 = team1;
            $scope.oldTeam2 = team2;
            $scope.editingTeam1 = team1;
            $scope.updatedTeam2 = team2;
        }

        $scope.cancelEditTeam = function () {
            $scope.isEditing = false;
        }

        $scope.cancelEditGame = function () {
            $scope.isEditingGame = false;
        }

        $scope.updateTeam = function () {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].Name === $scope.oldTeamName) {
                    $scope.teams[i].Name = $scope.updatedName;
                }
            }

            $scope.isEditing = false;
            $scope.updatedName = "";
            $scope.oldTeamName = "";
            cleanLists();
        };

        $scope.addNewTeam = function () {
            var nid = $scope.teams[$scope.teams.length - 1].id + 1;
            $scope.teams.push(
                { leagueID: parseInt($stateParams.id), id: nid, Name: $scope.newTeamName, IsArchived: true }
            );
            $scope.newTeamName = "";
            cleanLists();
        };

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

        $scope.setTeamEnabled = function (team, value) {
            team.IsArchived = value;
        };
        $scope.setGameEnabled = function (game, value) {
            game.IsArchived = value;
        };

        $scope.deleteTeam = function (teamName) {
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].Name === teamName)
                    $scope.teams.splice(i, 1);
            }
            cleanLists();
        };

        $scope.deleteGame = function (gameID) {
            for (var i = 0; i < $scope.games.length; i++) {
                if ($scope.games[i].id === gameID)
                    $scope.games.splice(i, 1);
            }
            cleanLists();
        };

        cleanLists();

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
]);

