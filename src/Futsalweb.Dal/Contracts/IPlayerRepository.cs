using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Dal.Contracts
{
    public interface IPlayerRepository
    {
        IEnumerable<Player> GetPlayersByTeamId(Guid teamId);

        void Save(Player player);

        void Update(Player player);

        void Delete(Guid id);
    }
}
