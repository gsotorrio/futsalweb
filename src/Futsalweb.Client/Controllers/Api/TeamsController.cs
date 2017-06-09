using System;
using System.Net;
using System.Web.Http;
using Futsalweb.Business.Contracts;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Client.Controllers.Api
{
    public class TeamsController : ApiController
    {
        private ITeamService _teamSrv;
        private IPlayerService _playerSrv;
        private ICoacheService _coacheSrv;

        public TeamsController(ITeamService teamService, IPlayerService playerService, ICoacheService coacheService)
        {
            _teamSrv = teamService;
            _playerSrv = playerService;
            _coacheSrv = coacheService;
        }

        // GET: api/teams
        public IHttpActionResult Get()
        {
            return Ok(_teamSrv.GetAllTeams());
        }

        // GET: api/teams/id
        public IHttpActionResult Get(Guid id)
        {
            return Ok(_teamSrv.GetTeamById(id));
        }

        // POST: api/teams
        public IHttpActionResult Post([FromBody] Team team)
        {
            team = _teamSrv.CreateTeam(team);

            return Created(new Uri($"{Request.RequestUri}/{team.Id}"), team);
        }

        // PUT: api/teams
        public IHttpActionResult Put([FromBody] Team team)
        {
            _teamSrv.UpdateTeam(team);
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/teams/id
        public IHttpActionResult Delete(Guid id)
        {
            _teamSrv.DeleteTeam(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET
        [Route("api/teams/{id}/players")]
        public IHttpActionResult GetPlayers(Guid id)
        {
            return Ok(_playerSrv.GetAllPlayersForATeam(id));
        }

        // GET
        [Route("api/teams/{id}/coaches")]
        public IHttpActionResult GetCoaches(Guid id)
        {
            return Ok(_coacheSrv.GetAllCoachesForATeam(id));
        }
    }
}
