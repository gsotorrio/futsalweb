using System;
using System.Collections.Generic;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Contracts
{
    public interface IGameService
    {
        List<Game> GetAllGames();

        Game CreateGame(Game game);

        void UpdateTeam(Game game);

        void DeleteGame(Guid id);

        Game GetGameById(Guid id);
    }
}
