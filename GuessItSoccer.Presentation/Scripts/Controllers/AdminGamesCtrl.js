'user strict';
angular.module('app.controllers')
// Path /league/#/games
    .controller('AdminGamesCtrl', [
        '$scope', '$location', '$window', '$stateParams', 'TeamsService', 'GamesService', function ($scope, $location, $window, $stateParams, TeamsService, GamesService) {
            $scope.$root.title = 'GuessIt Soccer | League Games';
            console.log($stateParams);
            $scope.leagueID = $stateParams.id;

            $scope.games = [];
            $scope.teams = [];
            $scope.isEditing = false;
            $scope.newGame = {};
            $scope.format = "yyyy-MMMM-dd";
            $scope.gameForUpdate = {};

            $scope.loadTeams = function () {
                TeamsService.getTeamsForLeague($scope.leagueID, function (response) {
                    $scope.teams = response;
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });
            }
            $scope.loadTeams();

            $scope.loadGames = function() {
                GamesService.getGamesForLeague($scope.leagueID, function(response) {
                    $scope.games = response;
                    console.log(response);
                }, function(error) {
                    console.log(error);
                });
            }
            $scope.loadGames();

            $scope.updateGame = function() {
                GamesService.updateGameInServer($scope.leagueID, $scope.gameForUpdate, function (response) {
                    $scope.loadGames();
                    $scope.gameForUpdate = {};
                    console.log(response);
                    $scope.isEditing = false;
                }, function (error) {
                    console.log(error);
                });
            }

            $scope.editGame = function(game) {
                $scope.gameForUpdate = game;
                $scope.isEditing = true;
            }

            $scope.cancelEditGame = function() {
                $scope.isEditing = false;
            }
}]);