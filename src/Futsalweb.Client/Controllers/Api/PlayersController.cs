using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Futsalweb.Business.Contracts;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Client.Controllers.Api
{
    public class PlayersController : ApiController
    {
        private readonly IPlayerService _playerSrv;

        public PlayersController(IPlayerService playerService)
        {
            _playerSrv = playerService;
        }

        // POST: api/players
        public IHttpActionResult Post([FromBody] Player player)
        {
            player = _playerSrv.CreatePlayer(player);

            return Created(new Uri($"{Request.RequestUri}/{player.Id}"), player);
        }

        // PUT: api/players
        public IHttpActionResult Put([FromBody] Player player)
        {
            _playerSrv.UpdatePlayer(player);
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/players/id
        public IHttpActionResult Delete(Guid id)
        {
            _playerSrv.DeletePlayer(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
