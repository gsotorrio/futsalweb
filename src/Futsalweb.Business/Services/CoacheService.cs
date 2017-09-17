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
        private readonly ITeamRepository _teamRepo;

        public CoacheService(ICoacheRepository coacheRepository, ITeamRepository teamRepository)
        {
            _coacheRepo = coacheRepository;
            _teamRepo = teamRepository;
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

        public Team GetTeamForThisCoache(Guid id)
        {
            var coache = GetCoacheById(id);
            return _teamRepo.GetById(coache.TeamId);
        }

        public Coache GetCoacheById(Guid id)
        {
            return _coacheRepo.GetById(id);
        }

        public void UpdateCoache(Coache coache)
        {
            _coacheRepo.Update(coache);
        }
    }
}
