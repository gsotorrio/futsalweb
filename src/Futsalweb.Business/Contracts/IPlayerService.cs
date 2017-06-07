using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Contracts
{
    public interface IPlayerService
    {
        List<Player> GetAllPlayersForATeam(Guid teamId);

        Player CreatePlayer(Player player);

        void UpdatePlayer(Player player);

        void DeletePlayer(Guid id);
    }
}