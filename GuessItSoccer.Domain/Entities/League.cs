using System.Collections.Generic;

namespace GuessItSoccer.Domain.Entities
{
    public class League: IEntity
    {
        public virtual long Id { get; set; }
        public virtual string Name { get; set; }
        public virtual IEnumerable<Team> Teams { get; set; } 
        //games
        //Games have Teams
        //games have a date
        //games have a result
        //games have a prediction
        //prediction have a user
        //predictions have a result
        //
    }
}