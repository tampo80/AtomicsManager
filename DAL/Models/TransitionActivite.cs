using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class TransitionActivite
    {
        public int ActiviteId { get; set; }
        public Activite Activite { get; set; }

        public int TransitionId { get; set; }
        public Transition Transition { get; set; }

    }
}
