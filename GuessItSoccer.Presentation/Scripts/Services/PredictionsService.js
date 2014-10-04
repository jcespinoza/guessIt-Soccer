'use strict';
angular.module('app.services')
    .factory('PredictionsService', function($http, ServerService, $cookieStore) {
    return {
        getUserPredictions: function (userId, success, error) {
            $http
                .get(
                    ServerService.get() + '/users/'+userId+'/predictions', {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        hasPredictionForGame: function (userId, gameId, success, error) {
            $http
                .get(
                    ServerService.get() + '/users/'+userId+'/predictions/haspredictionforgame/'+gameId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        uploadNewPrediction: function (userId, gameId, predictionModel, success, error) {
            $http({
                url: ServerService.get() + '/users/'+userId+'/games/'+gameId+'/predictions/createprediction/',
                dataType: 'json',
                method: 'POST',
                data: predictionModel,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': $cookieStore.get('access_token')
                }
            })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        updatePredictionInServer: function (userId, gameId, predictionModel, success, error) {
            $http({
                url: ServerService.get() + '/users/' + userId + '/games/' + gameId + '/predictions/editprediction/',
                dataType: 'json',
                method: 'POST',
                data: predictionModel,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': $cookieStore.get('access_token')
                }
            })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
        deletePredictionFromServer: function (userId, gameId, predictionId, success, error) {
            $http.post(
                    ServerService.get() + 'users/'+userId+'/games/'+gameId+'/predictions/deleteprediction/'+predictionId, {
                        headers: { "Content-Type": "application/json", 'Authorization': $cookieStore.get('access_token') }
                    })
                .success(function (response) {
                    success(response);
                }).error(error);
        },
    };
});