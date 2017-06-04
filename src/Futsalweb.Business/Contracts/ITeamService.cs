using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Contracts
{
    public interface ITeamService
    {
        List<Team> GetAllTeams();

        Team GetTeamById(Guid id);

        Team CreateTeam(Team team);

        void UpdateTeam(Team team);

        void DeleteTeam(Guid id);
    }
}
