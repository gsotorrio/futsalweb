using System;
using System.Web.Mvc;

namespace Futsalweb.Client.Controllers
{
    public class TeamsController : Controller
    {
        // GET: teams/list
        public ActionResult List()
        {
            return View();
        }

        // GET: teams/Manager
        public ActionResult Manager()
        {
            return View();
        }

        // GET: teams/Players
        public ActionResult Players()
        {
            return View();
        }

        // GET: teams/Coaches
        public ActionResult Coaches()
        {
            return View();
        }

        // GET: teams/Details
        public ActionResult Details()
        {
            return View();
        }
    }
    public class GamesController : Controller
    {
        // GET: games/ListGames
        public ActionResult ListGames()
        {
            return View();
        }

        // GET: games/CreateGames
        public ActionResult CreateGames()
        {
            return View();
        }

        // GET: games/PlayersGame
        public ActionResult PlayersGame()
        {
            return View();
        }
    }

}