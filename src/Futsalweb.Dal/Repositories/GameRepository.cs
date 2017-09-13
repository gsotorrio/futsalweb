using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Futsalweb.CrossLayer.Settings;
using Futsalweb.Dal.Contracts;
using Futsalweb.Domain.Entities;
using Dapper;

namespace Futsalweb.Dal.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly string _connectionString;

        public GameRepository()
        {
            _connectionString = AppSettings.ConnectionString;
        }

        public void Delete(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("DELETE FROM Games WHERE Id = @Id;", new { Id = id });
            }
        }

        public IEnumerable<Game> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return db.Query<Game>(
                                    @"SELECT G.Id, T.Name AS [TeamName], G.RivalTeam, G.Date, G.Location, G.Type, G.PlayedAtHome 
                                    FROM Games G
                                    INNER JOIN Teams T 
                                    ON T.Id = G.TeamId;");
            }
        }

        public Game GetById(Guid id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                return db.Query<Game>(
                                    @"SELECT G.Id, T.Name AS [TeamName], G.RivalTeam, G.Date, G.Location, G.Type, G.PlayedAtHome 
                                    FROM Games G
                                    INNER JOIN Teams T 
                                    ON T.Id = G.TeamId
                                    WHERE G.Id = @Id;", new { Id = id }).Single();
            }
        }

        public void Save(Game game)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("INSERT INTO Games VALUES (@Id, @TeamId, @RivalTeam, @Date, @Location, @Type, @PlayedAtHome);", game);
            }
        }

        public void Update(Game game)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute(
                    @"UPDATE Games SET TeamId = @TeamId, RivalTeam = @RivalTeam, Date = @Date, Location = @Location, Type = @Type, PlayedAtHome = @PlayedAtHome 
                      WHERE Id = @Id;", 
                    game);
            }
        }
    }
}
