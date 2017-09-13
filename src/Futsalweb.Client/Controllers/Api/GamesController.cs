using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Futsalweb.Business.Contracts;
using Futsalweb.Client.Models;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Client.Controllers.Api
{
    public class GamesController : ApiController
    {
        private readonly IGameService _gameSrv;

        public GamesController(IGameService gameService)
        {
            _gameSrv = gameService;
        }

        // GET: api/games
        public IHttpActionResult Get()
        {
            return Ok(_gameSrv.GetAllGames().Select(g => new
            {
                g.Id, 
                TeamName = g.TeamName,
                g.RivalTeam,
                date = g.Date.ToShortDateString(),
                time = g.Date.ToShortTimeString(),
                g.Location,
                g.Type,
                g.PlayedAtHome
            }));
        }

        // GET: api/games/id
        public IHttpActionResult Get(Guid id)
        {
            return Ok(_gameSrv.GetGameById(id));
        }

        // POST: api/games
        public IHttpActionResult Post([FromBody] GameViewModel gameVM)
        {
            var game = _gameSrv.CreateGame(new Game
            {
                Id = gameVM.Id,
                RivalTeam = gameVM.RivalTeam,
                TeamId = gameVM.TeamId,
                Type = gameVM.Type,
                Location = gameVM.Location,
                Date = DateTime.Parse($"{gameVM.Date} {gameVM.Time}"),
                PlayedAtHome = gameVM.PlayedAtHome
            });

            gameVM.Id = game.Id;

            return Created(new Uri($"{Request.RequestUri}/{game.Id}"), gameVM);
        }

        // PUT: api/games
        public IHttpActionResult Put([FromBody] GameViewModel gameVM)
        {
            _gameSrv.UpdateTeam(new Game
            {
                Id = gameVM.Id,
                RivalTeam = gameVM.RivalTeam,
                TeamId = gameVM.TeamId,
                Type = gameVM.Type,
                Location = gameVM.Location,
                Date = DateTime.Parse($"{gameVM.Date} {gameVM.Time}"),
                PlayedAtHome = gameVM.PlayedAtHome
            });

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/games/id
        public IHttpActionResult Delete(Guid id)
        {
            _gameSrv.DeleteGame(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
