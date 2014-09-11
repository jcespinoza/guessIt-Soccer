'user strict';
angular.module('app.controllers', [])
// Path: /login
    .controller('LoginCtrl', ['$scope', '$location', '$window', 'AccountService', function ($scope, $location, $window, accountService) {
        $scope.$root.title = 'GuessIt Soccer | Sign In';
        $scope.userFound = true;
        $scope.user = {};
        $scope.login = function () {
            console.log("About to do request");
            accountService.login($scope.user, function (response) {
                console.log(response);
            }, function (error) {
                alert(error);
            });
        };
        $scope.newUser = {};
        $scope.signup = function () {
            console.log("About to sign up");
            accountService.signup($scope.newUser, function (response) {
                console.log(response);
                $location.path('/login');
            }, function (error) {
                console.log(error);
            });
            console.log("Request sent:" + $scope.newUser);
        };
        $scope.goToPassRecovery = function () {
            $location.path('/password-recovery');
            return false;
        };
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])