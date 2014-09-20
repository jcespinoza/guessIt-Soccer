using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Iesi.Collections;

namespace GuessItSoccer.Domain.Entities
{
    public class Stadium: IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual string Name { get; set; }
        public virtual string Country { get; set; }
        public virtual string City { get; set; }
        public virtual Location Location { get; set; }
    }
}
