using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Futsalweb.Domain.Entities;

namespace Futsalweb.Dal.Contracts
{
    public interface IPlayerRepository
    {
        IEnumerable<Player> GetPlayersByTeamId(Guid teamId);
    }
}
