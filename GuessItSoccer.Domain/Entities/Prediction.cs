using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessItSoccer.Domain.Entities
{
    public class Prediction: IEntity
    {
        public virtual long Id { get; set; }
        public virtual bool IsArchived { get; set; }

        public virtual Result PredictedResult { get; set; }
        public virtual Game Game { get; set; }
    }
}
