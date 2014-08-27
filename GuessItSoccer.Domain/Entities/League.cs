using System.Collections.Generic;

namespace GuessItSoccer.Domain.Entities
{
    public class League: IEntity
    {
        public virtual long Id { get; set; }
        public virtual string Name { get; set; }
        public virtual IEnumerable<Team> Teams { get; set; } 
    }
}