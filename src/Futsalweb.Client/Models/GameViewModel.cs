using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Futsalweb.Client.Models
{
    public class GameViewModel
    {
        public Guid Id { get; set; }

        public string HomeTeam { get; set; }

        public string GuestTeam { get; set; }

        public string Date { get; set; }

        public string Time { get; set; }

        public string Location { get; set; }

        public string Type { get; set; }
    }
}