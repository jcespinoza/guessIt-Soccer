using System.Collections.Generic;
using Iesi.Collections;
using NHibernate.Loader.Custom.Sql;

namespace GuessItSoccer.Domain.Entities
{
    public class League: IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual string Name { get; set; }
        public virtual IEnumerable<Team> Teams { get; set; }
        public virtual IEnumerable<Game> Games { get; set; }
        //prediction have a user
        //predictions have a result
        //
    }
}