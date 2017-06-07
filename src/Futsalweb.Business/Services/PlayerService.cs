using System;
using System.Collections.Generic;
using System.Linq;
using Futsalweb.Business.Contracts;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Business.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepo;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepo = playerRepository;
        }

        public Player CreatePlayer(Player player)
        {
            player.Id = Guid.NewGuid();
            _playerRepo.Save(player);
            return player;
        }

        public void DeletePlayer(Guid id)
        {
            _playerRepo.Delete(id);
        }

        public List<Player> GetAllPlayersForATeam(Guid teamId)
        {
            return _playerRepo.GetPlayersByTeamId(teamId).ToList();
        }

        public void UpdatePlayer(Player player)
        {
            _playerRepo.Update(player);
        }
    }
}
