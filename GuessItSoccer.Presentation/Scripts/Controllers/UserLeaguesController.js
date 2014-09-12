'user strict';
angular.module('app.controllers')
// Path: /leagues
.controller('UserLeaguesCtrl', [
    '$scope', '$location', '$stateParams', '$window', function ($scope, $location, $window, $stateParams) {
        $scope.$root.title = 'GuessIt Soccer | Leagues';
        $scope.username = $stateParams.user;
        console.log("Incoming user: " + $stateParams.user);
        $scope.isEditing = false;
        $scope.newLeagueName = "";
        $scope.updatedName = "";

        $scope.availableLeagues = [
            { id: 1, Name: "Spanish La Liga", IsArchived: true },
            { id: 2, Name: "English Premier League", IsArchived: true },
            { id: 3, Name: "Italian Serie A", IsArchived: true },
            { id: 4, Name: "German Bundesliga", IsArchived: true },
            { id: 5, Name: "Honduran Liga Nacional", IsArchived: true }
        ];

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