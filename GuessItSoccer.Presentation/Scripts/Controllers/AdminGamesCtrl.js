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
            $scope.newGame.MatchDate = Date.now();
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
                    $scope.gameForUpdate = {};
                    console.log(response);
                    $scope.isEditing = false;
                    $scope.loadGames();
                }, function (error) {
                    console.log(error);
                });
            }

            $scope.addNewGame = function() {
                GamesService.uploadGameToServer($scope.leagueID, $scope.newGame, function(response) {
                    $scope.newGame = {};
                    $scope.newGame.MatchDate = Date.now();
                    console.log("Created game");
                    $scope.loadGames();
                }, function(error) {
                    console.log("Failed");
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