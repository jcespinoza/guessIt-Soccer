'user strict';
angular.module('app.controllers')
// Path: /leagues
.controller('LeaguesCtrl', [
    '$scope', '$location', '$window', 'LeaguesService', function ($scope, $location, $window, LeaguesService) {
        $scope.$root.title = 'GuessIt Soccer | Leagues';

        $scope.isEditing = false;

        //New variables for API
        
        $scope.availableLeagues = [];
        $scope.suscribedLeagues = [];
        $scope.newLeague = {};
        $scope.leagueForUpdate = {};

        $scope.loadLeagues = function () {
            console.log($scope.newLeague);
            LeaguesService.getAvailableLeagues(function (availableLeagues) {
                $scope.availableLeagues = availableLeagues;
                console.log("Leagues were loaded");
                console.log(availableLeagues);
            }, function (error) {
                alert('Error loading available leagues');
                console.log(error);
            });
        };
        $scope.loadLeagues();
        
        $scope.submitNewLeague = function() {
            LeaguesService.uploadNewLeague($scope.newLeague, function(response) {
                console.log(response);
                $scope.loadLeagues();
                $scope.newLeague = {};
            }, function(error) {
                console.log(error);
            });
        }

        $scope.editLeague = function (league) {
            $scope.isEditing = true;
            $scope.leagueForUpdate = league;
        }

        $scope.cancelEditLeague = function () {
            $scope.isEditing = false;
        }

        $scope.updateLeague = function () {
            LeaguesService.updateLeagueInServer($scope.leagueForUpdate, function(response) {
                console.log(response);
                $scope.loadLeagues();
                $scope.isEditing = false;
            }, function(error) {
                console.log(error);
            });
        }

        $scope.setLeagueEnabled = function (league, value) {
            if (value) {
                LeaguesService.restoreLeagueInServer(league.Id,
                function (response) {
                    console.log(response);
                    $scope.loadLeagues();
                },
                function (error) {
                    console.log(error);
                });
            } else {
                $scope.deleteLeague(league);
            }
        };

        $scope.deleteLeague = function (league) {
            LeaguesService.archiveLeagueInServer(league.Id,
                function (response) {
                    console.log(response);
                    $scope.loadLeagues();
                },
                function (error) {
                    console.log(error);
                });
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
]);