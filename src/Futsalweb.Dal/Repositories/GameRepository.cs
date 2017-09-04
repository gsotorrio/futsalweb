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
                return db.Query<Game>("SELECT * FROM Games;");
            }
        }

        public void Save(Game game)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute("INSERT INTO Games VALUES (@Id, @HomeTeam, @GuestTeam, @Date, @Location, @Type);", game);
            }
        }

        public void Update(Game game)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                db.Execute(
                    @"UPDATE Games SET HomeTeam = @HomeTeam, GuestTeam = @GuestTeam, Date = @Date, Location = @Location, Type = @Type 
                      WHERE Id = @Id;", 
                    game);
            }
        }
    }
}
