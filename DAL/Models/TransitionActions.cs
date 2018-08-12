using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class TransitionActions
    {
        public int ActionsId { get; set; }
        public Actions Actions { get; set; }

        public int TransitionId { get; set; }
        public Transition Transition { get; set; }
    }
}
