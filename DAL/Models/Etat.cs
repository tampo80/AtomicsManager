using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Etat:AuditableEntity
    {
        public int Id { get; set; }
        public TypeEtats TypeEtats { get; set; }
        public int ProcessId { get; set; }
        public Process Process { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<EtatActivite> EtatActivite { get; set; }
    }
}
