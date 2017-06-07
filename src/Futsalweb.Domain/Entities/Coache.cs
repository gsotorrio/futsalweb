using System;

namespace Futsalweb.Domain.Entities
{
    public class Coache
    {
        public Guid Id { get; set; }

        public Guid TeamId { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public DateTime Birthdate { get; set; }

        public string Role { get; set; }
    }
}
