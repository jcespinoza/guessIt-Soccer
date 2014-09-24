// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="">
//   Copyright © 2014 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.GuessItSoccer.Presentation
{
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/content/css/app").Include("~/content/app.css"));

            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/scripts/vendor/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/js/app").Include(
                "~/scripts/vendor/angular.min.js",
                "~/scripts/vendor/jquery-{version}.js",
                "~/scripts/vendor/angular-cookies.js",
                "~/scripts/vendor/angular-ui-router.js",
                "~/scripts/vendor/ui-bootstrap-tpls-0.11.0.min.js",
                "~/scripts/filters.js",
                "~/scripts/vendor/ui-bootstrap-0.11.0.min.js",
                "~/scripts/Services.js",
                "~/scripts/directives.js",
                "~/scripts/Controllers.js",
                "~/scripts/routingConfig.js",
                "~/scripts/Controllers/AboutController.js",
                "~/scripts/Controllers/Error404Controller.js",
                "~/scripts/Controllers/HomeController.js",
                "~/scripts/Controllers/LeaguesController.js",
                "~/scripts/Controllers/LoginController.js",
                "~/scripts/Controllers/PasswordRecoveryController.js",
                "~/scripts/Controllers/SingleLeagueController.js",
                "~/scripts/Controllers/UserLeaguesController.js",
                "~/scripts/Controllers/AdminGamesCtrl.js",
                "~/scripts/Services/AuthService.js",
                "~/scripts/Services/LeaguesService.js",
                "~/scripts/Services/AccountService.js",
                "~/scripts/Services/ServerService.js",
                "~/scripts/Services/TeamsService.js",
                "~/scripts/Services/GamesService.js",
                "~/scripts/app.js"));
        }
    }
}
