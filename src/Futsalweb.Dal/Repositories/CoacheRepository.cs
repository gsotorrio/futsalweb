using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Futsalweb.CrossLayer.Settings;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;
using Dapper;

namespace Futsalweb.Dal.Repositories
{
    public class CoacheRepository : ICoacheRepository
    {
        private readonly string _connectionString;

        public CoacheRepository()
        {
            _connectionString = AppSettings.ConnectionString;
        }

        public void Delete(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("DELETE FROM Coaches WHERE Id = @Id;", new { Id = id });
            }
        }

        public void DeleteAllForTeam(Guid teamId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("DELETE FROM Coaches WHERE TeamId = @TeamId;", new { TeamId = teamId });
            }
        }

        public IEnumerable<Coache> GetCoachesByTeamId(Guid teamId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return db.Query<Coache>("SELECT * FROM Coaches WHERE TeamId = @TeamId;", new { TeamId = teamId });
            }
        }

        public void Save(Coache coache)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"INSERT INTO Coaches " + 
                    "VALUES (@Id, @TeamId, @Name, @Surname, @Birthdate, @Role);";

                db.Execute(query, coache);
            }
        }

        public void Update(Coache coache)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var query = @"UPDATE Coaches SET Name = @Name, Surname = @Surname, Birthdate = @Birthdate, Role = @Role " + 
                    "WHERE Id = @Id;";

                db.Execute(query, coache);
            }
        }
    }
}
