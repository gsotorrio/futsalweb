using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Futsalweb.Client.Controllers
{
    public class GamesController : Controller
    {
        // GET: games/list
        public ActionResult List()
        {
            return View();
        }

        // GET: games/create
        public ActionResult Manager()
        {
            return View();
        }

        // GET: games/player
        public ActionResult Players()
        {
            return View();
        }

        // GET: games/details
        public ActionResult Details()
        {
            return View();
        }
    }
}