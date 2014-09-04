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
                "~/scripts/vendor/angular-ui-router.js",
                "~/scripts/filters.js",
                "~/scripts/vendor/ui-bootstrap-0.11.0.min.js",
                "~/scripts/services.js",
                "~/scripts/directives.js",
                "~/scripts/controllers.js",
                "~/scripts/app.js"));
        }
    }
}
