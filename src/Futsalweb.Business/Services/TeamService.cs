using System;
using System.Collections.Generic;
using System.Linq;
using Futsalweb.Business.Contracts;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Services
{
    public class TeamService : ITeamService
    {
        private ITeamRepository _teamRepo;
        
        public TeamService(ITeamRepository teamRepository)
        {
            _teamRepo = teamRepository;
        }

        public Team CreateTeam(Team team)
        {
            team.Id = Guid.NewGuid();
            _teamRepo.Save(team);
            return team;
        }

        public void DeleteTeam(Guid id)
        {
            _teamRepo.Delete(id);
        }

        public List<Team> GetAllTeams()
        {
            return _teamRepo.GetAll().ToList();
        }

        public Team GetTeamById(Guid id)
        {
            return _teamRepo.GetById(id);
        }

        public void UpdateTeam(Team team)
        {
            _teamRepo.Update(team);
        }
    }
}
