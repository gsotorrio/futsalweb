using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Dal.Contracts
{
    public interface ICoacheRepository
    {
        IEnumerable<Coache> GetCoachesByTeamId(Guid teamId);

        void Save(Coache coache);

        void Update(Coache coache);

        void Delete(Guid id);

        void DeleteAllForTeam(Guid teamId);
    }
}
