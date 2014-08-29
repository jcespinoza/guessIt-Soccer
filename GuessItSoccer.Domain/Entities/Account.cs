using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessItSoccer.Domain.Entities
{
    public class Account: IEntity
    {
        public virtual long Id { get; set; }

        public virtual bool IsArchived { get; set; }

        public virtual string Email { get; set; }

        public virtual string Name { get; set; }

        public virtual string Password { get; set; }

        
        
        public virtual IEnumerable<League>  Leagues { get; set; }
    }
}
