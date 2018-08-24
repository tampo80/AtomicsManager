using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Actions:AuditableEntity
    {
        public int Id { get; set; }
        public TypeAction TypeAction { get; set; }

        public Process Process { get; set; }
        public int ProcessId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


        public ICollection<TransitionActions> TransitionActions { get; set; }
        public ICollection<ActionTarget> ActionTarget { get; set; }
        public ICollection<DemandesAction> DemandesAction { get; set; }
        public ICollection<ActionsHistories> ActionsHistories { get; set; }
    
}
}
