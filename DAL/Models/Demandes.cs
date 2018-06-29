using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Demandes:AuditableEntity
    {
        public int Id { get; set; }
        public string userId { get; set; }
        public DateTime DateDemande { get; set; }
        public string Motif { get; set; }
    }
}
