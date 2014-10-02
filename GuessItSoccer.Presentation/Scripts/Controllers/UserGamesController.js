'user strict';
angular.module('app.controllers')
// Path: /leagues
.controller('UserGamesCtrl', [
    '$scope', '$location', '$stateParams', '$window', 'LeaguesService', 'GamesService', 'AuthService', function ($scope, $location, $stateParams, $window, LeaguesService, GamesService, AuthService) {

        //Needed variables
        $scope.userId = $stateParams.user;
        $scope.leagueId = $stateParams.league;
        $scope.currentLeague = {};

        $scope.requestLeagueWithId = function () {
            console.log("Requesting League");
            LeaguesService.getLeagueById($scope.leagueId, function(response) {
                $scope.currentLeague = response;
            }, function(error) {
                console.log(error);
            });
        }
        $scope.requestLeagueWithId();
    }
]);