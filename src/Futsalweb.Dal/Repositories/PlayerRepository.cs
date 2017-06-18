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

        public void Delete(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("DELETE FROM Players WHERE Id = @Id;", new { Id = id });
            }
        }

        public void DeleteAllForTeam(Guid teamId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("DELETE FROM Players WHERE TeamId = @TeamId;", new { TeamId = teamId });
            }
        }

        public IEnumerable<Player> GetPlayersByTeamId(Guid teamId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return db.Query<Player>("SELECT * FROM Players WHERE TeamId = @TeamId;", new { TeamId = teamId });
            }
        }

        public void Save(Player player)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"INSERT INTO Players " + 
                    "VALUES (@Id, @TeamId, @Name, @Surname, @Birthdate, @Height, @Weight, @StrongLeg, @Status);";

                db.Execute(query, player);
            }
        }

        public void Update(Player player)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"UPDATE Players SET Name = @Name, Surname = @Surname, Birthdate = @Birthdate, Height = @Height, " + 
                    "Weight = @Weight, StrongLeg = @StrongLeg, Status = @Status " + 
                    "WHERE Id = @Id;";

                db.Execute(query, player);
            }
        }
    }
}
