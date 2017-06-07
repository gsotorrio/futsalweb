using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Futsalweb.CrossLayer.Settings;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;
using Dapper;

namespace Futsalweb.Dal.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly string _connectionString;

        public PlayerRepository()
        {
            _connectionString = AppSettings.ConnectionString;
        }

        public IEnumerable<Player> GetPlayersByTeamId(Guid teamId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return db.Query<Player>("SELECT * FROM Players WHERE TeamId = @TeamId;", new { TeamId = teamId });
            }
        }
    }
}
