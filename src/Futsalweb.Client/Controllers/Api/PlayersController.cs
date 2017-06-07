using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Futsalweb.Business.Contracts;

namespace Futsalweb.Client.Controllers.Api
{
    public class PlayersController : ApiController
    {
        private readonly IPlayerService _playerSrv;

        public PlayersController(IPlayerService playerService)
        {
            _playerSrv = playerService;
        }
    }
}
