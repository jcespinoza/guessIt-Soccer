'user strict';
angular.module('app.controllers')
// Path /league/#
.controller('SingleLeagueCtrl', [
    '$scope', '$location', '$window', '$stateParams', 'TeamsService', function ($scope, $location, $window, $stateParams, TeamsService) {
        $scope.$root.title = 'GuessIt Soccer | League Teams';
        console.log($stateParams);
        $scope.leagueID = $stateParams.id;

        $scope.isEditing = false;
        //API
        $scope.teams = [];
        $scope.teamForUpdate = {};
        $scope.newTeam = {};

        $scope.loadTeams = function() {
            TeamsService.getTeamsForLeague($scope.leagueID, function(response) {
                $scope.teams = response;
                console.log(response);
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
            TeamsService.updateTeamInServer($scope.leagueID, $scope.teamForUpdate, function(response) {
                $scope.loadTeams();
                $scope.isEditing = false;
            }, function(error) {
                console.log(error);
            });
        };

        $scope.addNewTeam = function () {
            TeamsService.uploadNewTeam($scope.leagueID, $scope.newTeam, function (response) {
                $scope.loadTeams();
                $scope.newTeam = {};
            }, function (error) {
                console.log(error);
            });
        };

        $scope.deleteTeam = function (team) {
            TeamsService.archiveTeamInServer($scope.leagueID, team.Id, function (response) {
                $scope.loadTeams();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.setTeamEnabled = function (team, value) {
            if (value) {
                TeamsService.restoreTeamInServer($scope.leagueID, team.Id, function (response) {
                    $scope.loadTeams();
                }, function (error) {
                    console.log(error);
                });
            } else {
                $scope.deleteTeam(team);
            }
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
]);

