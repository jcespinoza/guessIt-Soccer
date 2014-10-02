'user strict';
angular.module('app.controllers')
// Path: /leagues
.controller('UserGamesCtrl', [
    '$scope', '$location', '$stateParams', '$window', 'LeaguesService', 'GamesService', 'AuthService', function($scope, $location, $window, $stateParams, LeaguesService, GamesService, AuthService) {
        $scope.userId = $stateParams.user;
        $scope.leagueId = $stateParams.league;
        console.log($scope.userId);
        console.log($scope.leagueId);

        $scope.currentLeague = {};

        $scope.requestLeagueWithId = function() {
            
        }
    }
]);