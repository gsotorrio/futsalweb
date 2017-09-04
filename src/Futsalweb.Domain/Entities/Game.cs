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

        public Guid TeamId { get; set; }

        public string TeamName { get; set; }

        public string RivalTeam { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }

        public string Type { get; set; }

        public bool PlayedAtHome { get; set; }
    }
}
