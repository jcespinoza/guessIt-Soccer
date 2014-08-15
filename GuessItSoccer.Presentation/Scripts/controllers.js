'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    .controller('HomeCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'AngularJS SPA Template for Visual Studio';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'GuessIt Soccer SPA | About';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /login
    .controller('LoginCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'GuessIt Soccer | Sign In';
        // TODO: Authorize a user
        $scope.login = function () {
            $location.path('/leagues');
            return false;
        };
        $scope.goToSignup = function(){
            $location.path('/signup');
            return false;
        };
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    .controller('LeaguesCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'GuessIt Soccer | Leagues';
        
        $scope.leagues =[{id: 1, name: "Spanish La Liga"},
                            {id: 2, name: "English Premier League"},
                            {id: 3, name: "Italian Serie A"},
                            {id: 4, name: "German Bundesliga"},
                            {id: 5, name: "Honduran Liga Nacional"}
                        ];

        $scope.teams = [
                        {leagueID: 1, teamID: 1, name: "Real Madrid FC"},
                        {leagueID: 1, teamID: 2, name: "FC Barcelona"},
                        {leagueID: 1, teamID: 3, name: "Atletico Madrid"},
                        {leagueID: 1, teamID: 4, name: "Valencia"},
                        {leagueID: 1, teamID: 5, name: "Villareal"},
                        {leagueID: 1, teamID: 6, name: "Sevilla FC"},
                        {leagueID: 1, teamID: 7, name: "Real Sociedad"},
                        {leagueID: 1, teamID: 8, name: "Malaga"},
                        {leagueID: 2, teamID: 1, name: "Manchester United"},
                        {leagueID: 2, teamID: 2, name: "Chealsea FC"},
                        {leagueID: 2, teamID: 3, name: "Everton"},
                        {leagueID: 2, teamID: 4, name: "Arsenal"},
                        {leagueID: 2, teamID: 5, name: "Manchester City"},
                        {leagueID: 2, teamID: 6, name: "Liverpool"},
                        {leagueID: 2, teamID: 7, name: "Tottenham Hotspur"},
                        {leagueID: 2, teamID: 8, name: "New Castle"},
                        {leagueID: 3, teamID: 1, name: "Juventus"},
                        {leagueID: 3, teamID: 2, name: "Roma"},
                        {leagueID: 3, teamID: 3, name: "AC Milan"},
                        {leagueID: 3, teamID: 4, name: "Internazionale"},
                        {leagueID: 3, teamID: 5, name: "Caigliari"},
                        {leagueID: 3, teamID: 6, name: "Lazio"},
                        {leagueID: 3, teamID: 7, name: "Palermo"},
                        {leagueID: 3, teamID: 8, name: "Torino"},
                        {leagueID: 4, teamID: 1, name: "Bayern München"},
                        {leagueID: 4, teamID: 2, name: "borussia Dortmund"},
                        {leagueID: 4, teamID: 3, name: "Schalke 04"},
                        {leagueID: 4, teamID: 4, name: "Hannover 96"},
                        {leagueID: 4, teamID: 5, name: "Stuttgart"},
                        {leagueID: 4, teamID: 6, name: "Wolfsburg"},
                        {leagueID: 4, teamID: 7, name: "Werder Bremen"},
                        {leagueID: 4, teamID: 8, name: "Köln"},
                        {leagueID: 1, teamID: 1, name: "Olimpia"},
                        {leagueID: 1, teamID: 2, name: "Platense"},
                        {leagueID: 1, teamID: 3, name: "Marathon"},
                        {leagueID: 1, teamID: 4, name: "Parrillas One"},
                        {leagueID: 1, teamID: 5, name: "Real España"},
                        {leagueID: 1, teamID: 6, name: "Honduras Progreso"},
                        {leagueID: 1, teamID: 7, name: "Vida"},
                        {leagueID: 1, teamID: 8, name: "Victoria"}
                        ];
        

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /signup
    .controller('SignupCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'GuessIt Soccer | Sign Up';
        // TODO: Create a new account
        $scope.goToLogin = function () {
            $location.path('/login');
            return false;
        };
    }])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }]);