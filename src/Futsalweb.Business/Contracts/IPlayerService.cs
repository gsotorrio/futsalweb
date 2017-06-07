using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Contracts
{
    public interface IPlayerService
    {
        List<Player> GetAllPlayersForATeam(Guid teamId);
    }
}