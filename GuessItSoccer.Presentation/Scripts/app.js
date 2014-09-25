'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
angular.module('app', ['ui.router','ui.bootstrap' , 'ngCookies','app.filters', 'app.services', 'app.directives', 'app.controllers'])

    // Gets executed during the provider registrations and configuration phase. Only providers and constants can be
    // injected here. This is to prevent accidental instantiation of services before they have been fully configured.
    .config(['$stateProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $httpProvider, $locationProvider) {

        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $httpProvider.defaults.headers.common = { 'Content-Type': 'application/json' };
        $httpProvider.defaults.headers.post = { 'Content-Type': 'application/json' };
        $httpProvider.defaults.headers.put = { 'Content-Type': 'application/json' };
        $httpProvider.defaults.headers.patch = { 'Content-Type': 'application/json' };
        $httpProvider.defaults.headers.get = { 'Content-Type': 'application/json' };

        //var access = routingConfig.accessLevels;

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/index',
                controller: 'HomeCtrl'

            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about',
                controller: 'AboutCtrl'
            })
            .state('login', {
                url: '/login',
                layout: 'basic',
                templateUrl: '/views/login',
                controller: 'LoginCtrl'
            })
            .state('passrecovery', {
                url: '/password-recovery',
                layout: 'basic',
                templateUrl: '/views/password-recovery',
                controller: 'PassRecoveryCtrl'
            })
            .state('leagues', {
                url: '/admin/leagues',
                templateUrl: '/views/AdminUser/leagues',
                controller: 'LeaguesCtrl'
            })
            .state('userleagues', {
                url: '/users/{user}/leagues',
                templateUrl: '/views/NormalUser/leagues',
                controller: 'UserLeaguesCtrl'
            })
            .state('userleaguesgames', {
                url: '/users/{user}/leagues/{league}/games',
                templateUrl: '/views/NormalUser/games',
                controller: 'UserGamesCtrl'
            })
            .state('league', {
                url: '/admin/league/{id}/teams',
                templateUrl: '/views/AdminUser/league',
                controller: 'SingleLeagueCtrl'
            })
            .state('games', {
                url: '/admin/league/{id}/games',
                templateUrl: '/views/AdminUser/games',
                controller: 'AdminGamesCtrl'
            })
            .state('otherwise', {
                url: '*path',
                templateUrl: '/views/404',
                controller: 'Error404Ctrl'
            });

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        });
    }])

    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', 'AuthService', function ($templateCache, $rootScope, $state, $stateParams, AuthService) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to a server at the first page load
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());

        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (!AuthService.authorize(toState.data.access)) {
                $rootScope.error = "Seems like you tried to access a route you don't have access to...";
                event.preventDefault();

                if (fromState.url === '^') {
                    if (AuthService.isLoggedIn()) {
                        $state.go('home');
                    } else {
                        $rootScope.error = null;
                        $state.go('login');
                    }
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            // Sets the layout name, which can be used to display different layouts (header, footer etc.)
            // based on which page the user is located
            $rootScope.layout = toState.layout;
        });
    }]);