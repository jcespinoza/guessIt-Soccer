'user strict';
angular.module('app.controllers')
// Path: /leagues
.controller('LeaguesCtrl', [
    '$scope', '$location', '$window', 'LeaguesService', function ($scope, $location, $window, LeaguesService) {
        $scope.$root.title = 'GuessIt Soccer | Leagues';

        $scope.isEditing = false;
        $scope.variable = "algo";
        $scope.newLeagueName = "";
        $scope.updatedName = "";

        $scope.availableLeagues = [];
        $scope.suscribedLeages = [];

        $scope.loadLeagues = function () {
            LeaguesService.getAvailableLeagues(function (availableLeagues) {
                $scope.availableLeagues = availableLeagues;
                console.log("Leagues were loaded");
                console.log(availableLeagues);
            }, function (error) {
                alert('error loading available leagues');
            });
        };

        LeaguesService.getSuscribedLeagues(function (suscribedLeagues) {
            $scope.suscribedLeages = suscribedLeagues;
        }, function (error) {
            alert('error loading suscribed leagues');
        });

        $scope.oldLeagueName = "";
        $scope.editLeague = function (leagueName) {
            $scope.isEditing = true;
            $scope.oldLeagueName = leagueName;
            $scope.updatedName = leagueName;
        }

        $scope.cancelEditLeague = function () {
            $scope.isEditing = false;
        }

        $scope.updateLeague = function () {
            for (var i = 0; i < $scope.availableLeagues.length; i++) {
                if ($scope.availableLeagues[i].Name === $scope.oldLeagueName) {
                    $scope.availableLeagues[i].Name = $scope.updatedName;
                }
            }

            $scope.isEditing = false;
            $scope.updatedName = "";
            $scope.oldLeagueName = "";
        };

        $scope.addNewLeague = function () {
            var nid = $scope.availableLeagues[$scope.availableLeagues.length - 1].id + 1;
            $scope.availableLeagues.push(
                { id: nid, Name: $scope.newLeagueName, IsArchived: true }
            );
            $scope.newLeagueName = "";
        };

        $scope.setLeagueEnabled = function (league, value) {
            league.IsArchived = value;
        };

        $scope.deleteLeague = function (leagueName) {
            for (var i = 0; i < $scope.availableLeagues.length; i++) {
                if ($scope.availableLeagues[i].Name === leagueName)
                    $scope.availableLeagues.splice(i, 1);
            }
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
]);