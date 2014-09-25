'use strict';

angular.module('app.services')
.factory('AuthService', function ($http, $cookieStore, ServerService) {
    var accessLevels = routingConfig.accessLevels,
    userRoles = routingConfig.userRoles,
    currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        authorize: function(accessLevel, role) {
            if (role === undefined) {
                role = currentUser.role;
            }

            return accessLevel.bitMask & role.bitMask;
        },
        getCurrentUser: currentUser,
        isLoggedIn: function (user) {
            if (user === undefined) {
                user = currentUser;
            }
            return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
        },
        signup: function (user, success, error) {
            $http.post(ServerService.get() + '/signup', user).success(function (res) {
                changeUser(res);
                success(res);
            }).error(error);
        },
        login: function (user, success, error) {
            $http.post(ServerService.get() + '/login', user).success(function (res) {

                $cookieStore.put('access_token', res.access_token);
                $cookieStore.put('user', res);
                localStorage.setItem("res", JSON.stringify(res));
                changeUser(res);
                success(res);
            }).error(error);
        },
        loginByCookie: function (res, success, error) {
            changeUser(res);
            success(res);
        },
        logout: function (success, error) {
            //$http.post('/logout').success(function () {
            changeUser({
                username: '',
                role: userRoles.public
            });
            $cookieStore.remove('access_token');
            localStorage.removeItem('res');
            success();
            //}).error(error);
        },
        getUserId: function (success, error) {
            $http
            .get(
            ServerService.get() + '/subcontractor/getUserId',
            {
                headers: { 'Authorization': $cookieStore.get('access_token') }
            }).success(function (response) {
                success(response);
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});
