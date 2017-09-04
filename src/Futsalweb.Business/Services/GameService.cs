using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Futsalweb.Business.Contracts;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Services
{
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepo;

        public GameService(IGameRepository gameRepository)
        {
            _gameRepo = gameRepository;
        }

        public Game CreateGame(Game game)
        {
            game.Id = Guid.NewGuid();
            _gameRepo.Save(game);
            return game;
        }

        public void DeleteGame(Guid id)
        {
            _gameRepo.Delete(id);
        }

        public List<Game> GetAllGames()
        {
            return _gameRepo.GetAll().ToList();
        }

        public void UpdateTeam(Game game)
        {
            _gameRepo.Update(game);
        }
    }
}
