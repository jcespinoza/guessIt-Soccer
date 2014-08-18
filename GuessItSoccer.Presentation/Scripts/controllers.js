﻿'use strict';

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
        $scope.goToPassRecovery = function () {
            $location.path('/password-recovery');
            return false;
        };
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /PassRecovery
    .controller('PassRecoveryCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'GuessIt Soccer | Password Recovery';
        // TODO: Authorize a user
        $scope.submitRequest = function () {
            $location.path('/login');
            return false;
        };
        
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    .controller('LeaguesCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'GuessIt Soccer | Leagues';
        
        $scope.leagues =[{id: 1, name: "Spanish La Liga", isEnabled: true},
                            {id: 2, name: "English Premier League", isEnabled: true},
                            {id: 3, name: "Italian Serie A", isEnabled: true},
                            {id: 4, name: "German Bundesliga", isEnabled: true},
                            {id: 5, name: "Honduran Liga Nacional", isEnabled: true}
                        ];


        $scope.setLeagueEnabled = function(league, value){
            league.isEnabled = value;
        };

        $scope.deleteLeague = function(leagueName){
            for (var i = 0; i < $scope.leagues.length; i++) {
                if ($scope.leagues[i].name === leagueName)
                    $scope.leagues.splice(i, 1);
            }
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    .controller('SingleLeagueCtrl', ['$scope', '$location', '$window', '$stateParams', function ($scope, $location, $window, $stateParams) {
        $scope.$root.title = 'GuessIt Soccer | League';
        console.log("Incoming league ID: " + $stateParams.id);

        $scope.teamsFilter = [];

       $scope.teams = [
                        {leagueID: 1, teamID: 1, name: "Real Madrid FC", isEnabled: true},
                        {leagueID: 1, teamID: 2, name: "FC Barcelona", isEnabled: true},
                        {leagueID: 1, teamID: 3, name: "Atletico Madrid", isEnabled: true},
                        {leagueID: 1, teamID: 4, name: "Valencia", isEnabled: true},
                        {leagueID: 1, teamID: 5, name: "Villareal", isEnabled: true},
                        {leagueID: 1, teamID: 6, name: "Sevilla FC", isEnabled: true},
                        {leagueID: 1, teamID: 7, name: "Real Sociedad", isEnabled: true},
                        {leagueID: 1, teamID: 8, name: "Malaga", isEnabled: true},
                        {leagueID: 2, teamID: 1, name: "Manchester United", isEnabled: true},
                        {leagueID: 2, teamID: 2, name: "Chealsea FC", isEnabled: true},
                        {leagueID: 2, teamID: 3, name: "Everton", isEnabled: true},
                        {leagueID: 2, teamID: 4, name: "Arsenal", isEnabled: true},
                        {leagueID: 2, teamID: 5, name: "Manchester City", isEnabled: true},
                        {leagueID: 2, teamID: 6, name: "Liverpool", isEnabled: true},
                        {leagueID: 2, teamID: 7, name: "Tottenham Hotspur", isEnabled: true},
                        {leagueID: 2, teamID: 8, name: "New Castle", isEnabled: true},
                        {leagueID: 3, teamID: 2, name: "Roma", isEnabled: true},
                        {leagueID: 3, teamID: 1, name: "Juventus", isEnabled: true},
                        {leagueID: 3, teamID: 3, name: "AC Milan", isEnabled: true},
                        {leagueID: 3, teamID: 4, name: "Internazionale", isEnabled: true},
                        {leagueID: 3, teamID: 5, name: "Caigliari", isEnabled: true},
                        {leagueID: 3, teamID: 6, name: "Lazio", isEnabled: true},
                        {leagueID: 3, teamID: 7, name: "Palermo", isEnabled: true},
                        {leagueID: 3, teamID: 8, name: "Torino", isEnabled: true},
                        {leagueID: 4, teamID: 1, name: "Bayern München", isEnabled: true},
                        {leagueID: 4, teamID: 2, name: "borussia Dortmund", isEnabled: true},
                        {leagueID: 4, teamID: 3, name: "Schalke 04", isEnabled: true},
                        {leagueID: 4, teamID: 4, name: "Hannover 96", isEnabled: true},
                        {leagueID: 4, teamID: 5, name: "Stuttgart", isEnabled: true},
                        {leagueID: 4, teamID: 6, name: "Wolfsburg", isEnabled: true},
                        {leagueID: 4, teamID: 7, name: "Werder Bremen", isEnabled: true},
                        {leagueID: 4, teamID: 8, name: "Köln", isEnabled: true},
                        {leagueID: 1, teamID: 1, name: "Olimpia", isEnabled: true},
                        {leagueID: 1, teamID: 2, name: "Platense", isEnabled: true},
                        {leagueID: 1, teamID: 3, name: "Marathon", isEnabled: true},
                        {leagueID: 1, teamID: 4, name: "Parrillas One", isEnabled: true},
                        {leagueID: 1, teamID: 5, name: "Real España", isEnabled: true},
                        {leagueID: 1, teamID: 6, name: "Honduras Progreso", isEnabled: true},
                        {leagueID: 1, teamID: 7, name: "Vida", isEnabled: true},
                        {leagueID: 1, teamID: 8, name: "Victoria", isEnabled: true}
                        ];

        var cleanLists = function() {
            $scope.teamsFilter = [];
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].leagueID.toString() === $stateParams.id)
                    $scope.teamsFilter.push($scope.teams[i]);
            }
        };

        $scope.setTeamEnabled = function(team, value){
            team.isEnabled = value;
        };

        $scope.deleteTeam = function(teamName){
            for (var i = 0; i < $scope.teams.length; i++) {
                if ($scope.teams[i].name === teamName)
                    $scope.teamsFilter.splice(i, 1);
            }
            cleanLists();
        };

        cleanLists();

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