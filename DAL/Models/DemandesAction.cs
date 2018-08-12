using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
     public class  DemandesAction
    {
        public int Id { get; set; }

        public int DemandesId { get; set; }
        public Demandes Demandes { get; set; }

        public int ActionsId { get; set; }

        public Actions Actions { get; set; }

        public int TrasitionId { get; set; }
        public Transition Transition { get; set; }

        public bool IsActive { get; set; }
        public bool IsComplete { get; set; }
    }
}
