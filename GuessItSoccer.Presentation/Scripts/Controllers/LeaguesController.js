'user strict';
angular.module('app.controllers', [])
// Path: /leagues
.controller('LeaguesCtrl', [
    '$scope', '$location', '$window', function($scope, $location, $window) {
        $scope.$root.title = 'GuessIt Soccer | Leagues';

        $scope.isEditing = false;
        $scope.newLeagueName = "";
        $scope.updatedName = "";

        $scope.leagues = [
            { id: 1, name: "Spanish La Liga", isEnabled: true },
            { id: 2, name: "English Premier League", isEnabled: true },
            { id: 3, name: "Italian Serie A", isEnabled: true },
            { id: 4, name: "German Bundesliga", isEnabled: true },
            { id: 5, name: "Honduran Liga Nacional", isEnabled: true }
        ];

        $scope.oldLeagueName = "";
        $scope.editLeague = function(leagueName) {
            $scope.isEditing = true;
            $scope.oldLeagueName = leagueName;
            $scope.updatedName = leagueName;
        }

        $scope.cancelEditLeague = function() {
            $scope.isEditing = false;
        }

        $scope.updateLeague = function() {
            for (var i = 0; i < $scope.leagues.length; i++) {
                if ($scope.leagues[i].name === $scope.oldLeagueName) {
                    $scope.leagues[i].name = $scope.updatedName;
                }
            }

            $scope.isEditing = false;
            $scope.updatedName = "";
            $scope.oldLeagueName = "";
        };

        $scope.addNewLeague = function() {
            var nid = $scope.leagues[$scope.leagues.length - 1].id + 1;
            $scope.leagues.push(
                { id: nid, name: $scope.newLeagueName, isEnabled: true }
            );
            $scope.newLeagueName = "";
        };

        $scope.setLeagueEnabled = function(league, value) {
            league.isEnabled = value;
        };

        $scope.deleteLeague = function(leagueName) {
            for (var i = 0; i < $scope.leagues.length; i++) {
                if ($scope.leagues[i].name === leagueName)
                    $scope.leagues.splice(i, 1);
            }
        };

        $scope.$on('$viewContentLoaded', function() {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
]);