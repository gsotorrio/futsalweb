using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Futsalweb.Domain.Entities
{
    public class Game
    {
        public Guid Id { get; set; }

        public string HomeTeam { get; set; }

        public string GuestTeam { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }

        public string Type { get; set; }
    }
}
