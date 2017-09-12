using System.Web.Mvc;
using System.Web.Routing;

namespace Futsalweb.Client
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // Games
            routes.MapRoute(
                name: "GamesManager",
                url: "games/{id}/manager",
                defaults: new { controller = "Games", action = "Manager" }
            );

            routes.MapRoute(
                name: "GamesPlayers",
                url: "games/{id}/players",
                defaults: new { controller = "Games", action = "Players" }
            );

            routes.MapRoute(
               name: "GamesDetails",
               url: "games/{id}/details",
               defaults: new { controller = "Games", action = "Details" }
           );

            // Teams
            routes.MapRoute(
                name: "TeamsManager",
                url: "teams/{id}/manager",
                defaults: new { controller = "Teams", action = "Manager" }
            );

            routes.MapRoute(
                name: "TeamsPlayers",
                url: "teams/{id}/players",
                defaults: new { controller = "Teams", action = "Players" }
            );

            routes.MapRoute(
                name: "TeamsCoaches",
                url: "teams/{id}/coaches",
                defaults: new { controller = "Teams", action = "Coaches" }
            );

            routes.MapRoute(
               name: "DetailsView",
               url: "teams/{id}/details",
               defaults: new { controller = "Teams", action = "Details" }
           );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Teams", action = "List", id = UrlParameter.Optional }
            );
        }
    }
}
