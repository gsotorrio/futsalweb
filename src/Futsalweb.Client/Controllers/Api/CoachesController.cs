using System;
using System.Net;
using System.Web.Http;
using Futsalweb.Business.Contracts;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Client.Controllers.Api
{
    public class CoachesController : ApiController
    {
        private readonly ICoacheService _coacheSrv;

        public CoachesController(ICoacheService coacheService)
        {
            _coacheSrv = coacheService;
        }

        // POST: api/coaches
        public IHttpActionResult Post([FromBody] Coache coache)
        {
            coache = _coacheSrv.CreateCoache(coache);

            return Created(new Uri($"{Request.RequestUri}/{coache.Id}"), coache);
        }

        // PUT: api/coaches
        public IHttpActionResult Put([FromBody] Coache coache)
        {
            _coacheSrv.UpdateCoache(coache);
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/coaches/id
        public IHttpActionResult Delete(Guid id)
        {
            _coacheSrv.DeleteCoache(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
