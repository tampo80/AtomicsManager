using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Transition:AuditableEntity
    {
        public int Id { get; set; }
        public int ProcessId { get; set; }
        public Process Process { get; set; }

        public int EtatActuelId { get; set; }
        public Etat EtatActuel { get; set; }
        public int EtatSuivantId { get; set; }
        public Etat EtatSuivant { get; set; }

        public ICollection<TransitionActivite> TransitionActivite { get; set; }
        public ICollection<TransitionActions> TransitionActions { get; set; }
        public ICollection<DemandesAction> DemandesAction { get; set; }
    }
}
