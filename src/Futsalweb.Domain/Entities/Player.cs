using System;

namespace Futsalweb.Domain.Entities
{
    public class Player
    {
        public Guid Id { get; set; }

        public Guid TeamId { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public DateTime Birthdate { get; set; }

        public float Height { get; set; }

        public float Weight { get; set; }

        public string StrongLeg { get; set; }

        public string Status { get; set; }

        public string Position { get; set; }

        public int Number { get; set; }
    }
}
