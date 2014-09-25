'user strict';
angular.module('app.controllers')
// Path: /login
    .controller('LoginCtrl', ['$scope', '$location', '$window', 'AuthService', function ($scope, $location, $window, authService) {
        $scope.$root.title = 'GuessIt Soccer | Sign In';
        $scope.userFound = true;
        $scope.user = {};
        $scope.isLogginIn = false;
        $scope.login = function () {
            console.log("About to do request");
            authService.login($scope.user, function (response) {
                console.log(response);
                if (response.role.title === 'admin') {
                    $location.path('/admin/leagues');
                } else {
                    $location.path('/users/' + response.id + '/leagues');
                }
                $scope.isLoading = false;
                $scope.isLogginIn = true;
            }, function (error) {
                alert(error.Message);
                console.log(error);
            });
        };
        $scope.newUser = {};
        $scope.signup = function () {
            console.log("About to sign up");
            authService.signup($scope.newUser, function (response) {
                console.log(response);
                $('#signupbox').hide();
                $('#loginbox').show();
                $location.path('/login');
            }, function (error) {
                console.log(error);
            });
            console.log("Request sent:" + $scope.newUser);
        }
        $scope.goToPassRecovery = function () {
            $location.path('/password-recovery');
            return false;
        }
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }]);