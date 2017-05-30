using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Dal.Contracts
{
    public interface ITeamRepository
    {
        Team GetById(Guid id);

        IEnumerable<Team> GetAll();

        void Delete(Guid id);

        void Save(Team team);

        void Update(Team team);
    }
}
