using System;
using System.Collections.Generic;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;
using Dapper;
using System.Data.SqlClient;
using Futsalweb.CrossLayer.Settings;

namespace Futsalweb.Dal.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private readonly string _connectionString;

        public TeamRepository()
        {
            _connectionString = AppSettings.ConnectionString;
        }

        public IEnumerable<Team> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return db.Query<Team>("SELECT * FROM Teams;");
            }
        }

        public Team GetById(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return db.QueryFirstOrDefault<Team>("SELECT * FROM Teams WHERE Id = @Id;", new { Id = id });
            }
        }

        public void Delete(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("DELETE FROM Teams WHERE Id = @Id;", new { Id = id });
            }
        }

        public void Save(Team team)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("INSERT INTO Teams VALUES (@Id, @Name, @Category);", new
                {
                    team.Id,
                    team.Name,
                    team.Category
                });
            }
        }

        public void Update(Team team)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("UPDATE Teams SET Name = @Name, Category = @Category WHERE Id = @Id;", new
                {
                    team.Id,
                    team.Name,
                    team.Category
                });
            }
        }
    }
}
