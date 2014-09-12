'user strict';
angular.module('app.controllers')
// Path: /PassRecovery
    .controller('PassRecoveryCtrl', [
        '$scope', '$location', '$window', 'AccountService', function($scope, $location, $window, accountService) {
            $scope.$root.title = 'GuessIt Soccer | Password Recovery';

            $scope.requestSent = false;
            $scope.user = {};
            $scope.submitRequest = function() {
                accountService.reset($scope.user, function(response) {
                    console.log(response);
                }, function(error) {
                    console.log(error);
                });
                console.log("Email sent");
                $scope.requestSent = true;
            };

            $scope.$on('$viewContentLoaded', function() {
                $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
            });
        }
    ]);