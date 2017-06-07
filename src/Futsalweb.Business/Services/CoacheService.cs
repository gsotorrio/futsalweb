using System;
using System.Collections.Generic;
using System.Linq;
using Futsalweb.Business.Contracts;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Services
{
    public class CoacheService : ICoacheService
    {
        private readonly ICoacheRepository _coacheRepo;

        public CoacheService(ICoacheRepository coacheRepository)
        {
            _coacheRepo = coacheRepository;
        }

        public Coache CreateCoache(Coache coache)
        {
            coache.Id = Guid.NewGuid();
            _coacheRepo.Save(coache);
            return coache;
        }

        public void DeleteCoache(Guid id)
        {
            _coacheRepo.Delete(id);
        }

        public List<Coache> GetAllCoachesForATeam(Guid teamId)
        {
            return _coacheRepo.GetCoachesByTeamId(teamId).ToList();
        }

        public void UpdateCoache(Coache coache)
        {
            _coacheRepo.Update(coache);
        }
    }
}
