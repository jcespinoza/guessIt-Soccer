using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessItSoccer.Domain.Entities
{
    public class GameStadium: IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }
        public virtual Game Game { get; set; }
        public virtual Stadium Stadium { get; set; }
    }
}
