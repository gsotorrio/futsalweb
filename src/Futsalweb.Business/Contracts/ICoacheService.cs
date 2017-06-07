using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Contracts
{
    public interface ICoacheService
    {
        List<Coache> GetAllCoachesForATeam(Guid teamId);

        Coache CreateCoache(Coache coache);

        void UpdateCoache(Coache coache);

        void DeleteCoache(Guid id);
    }
}