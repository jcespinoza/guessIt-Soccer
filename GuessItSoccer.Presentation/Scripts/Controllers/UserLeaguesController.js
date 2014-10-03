'user strict';
angular.module('app.controllers')
// Path: /leagues
.controller('UserLeaguesCtrl', [
    '$scope', '$location', '$stateParams', '$window', 'LeaguesService', 'AuthService', function ($scope, $location, $window, $stateParams, LeaguesService, AuthService) {
        $scope.$root.title = 'GuessIt Soccer | Leagues';
        $scope.user = AuthService.user.id;
        $scope.leagueId = $stateParams.league;
        console.log("Incoming user: " + $stateParams.user);

        $scope.availableLeagues = [];
        $scope.suscribedLeagues = [];

        $scope.loadSuscribedLeagues = function() {
            LeaguesService.getSuscribedLeagues(function (availableLeagues) {
                $scope.suscribedLeagues = availableLeagues;
                console.log("Suscribed Leagues were loaded");
            }, function (error) {
                alert('error loading available leagues');
                console.log(error);
            });
        }
        $scope.loadSuscribedLeagues();

        $scope.loadLeagues = function () {
            LeaguesService.getAvailableLeagues(function (availableLeagues) {
                $scope.availableLeagues = availableLeagues;
                console.log("Leagues were loaded");
            }, function (error) {
                alert('error loading available leagues');
                console.log(error);
            });
        };
        $scope.loadLeagues();

        $scope.amSuscribed = function(league) {
            for (var i = 0; i < $scope.suscribedLeagues.length; i++) {
                if ($scope.suscribedLeagues[i].Id == league.Id && !league.IsArchived)
                    return true;
            }
            return false;
        }

        $scope.suscribeToLeague = function (league) {
            if (!$scope.amSuscribed(league)) {
                LeaguesService.suscribeToLeague(league.Id, function(availableLeagues) {
                    $scope.loadSuscribedLeagues();
                    $scope.loadLeagues();
                    console.log("Suscribed Leagues were loaded");
                }, function(error) {
                    alert('error loading available leagues');
                    console.log(error);
                });
            }
        }

        $scope.unsuscribeFromLeague = function(league) {
            LeaguesService.unsuscribeFromLeague(league.Id, function (availableLeagues) {
                $scope.loadSuscribedLeagues();
                $scope.loadLeagues();
                console.log("Suscribed Leagues were loaded");
            }, function (error) {
                alert('error loading available leagues');
                console.log(error);
            });
        }

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
]);