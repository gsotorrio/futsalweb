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

        public List<Player> GetAllPlayersForATeam(Guid teamId)
        {
            return _playerRepo.GetPlayersByTeamId(teamId).ToList();
        }
    }
}
