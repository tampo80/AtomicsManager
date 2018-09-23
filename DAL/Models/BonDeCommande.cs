using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class BonDeCommande:AuditableEntity
    {
        public int Id { get; set; }
        public DateTime DateOperation { get; set; }
        public string RefBon { get; set; }
        public int DemandesId { get; set; }
        public Demandes Demandes { get; set; }
        public string Montant { get; set; }
        public int Penalite { get; set; }
        public string Accompte { get; set; }

    }
}
