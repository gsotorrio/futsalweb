using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Dal.Contracts
{
    public interface IGameRepository
    {
        IEnumerable<Game> GetAll();

        void Save(Game game);

        void Update(Game game);

        void Delete(Guid id);

        Game GetById(Guid id);
        void SavePlayers(Guid id, IEnumerable<Guid> players);
    }
}
