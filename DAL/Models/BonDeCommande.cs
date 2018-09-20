using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class BonDeCommande
    {
        public int Id { get; set; }
        public DateTime DateOperation { get; set; }
        public int DemandeId { get; set; }
        public Demandes Demandes { get; set; }

    }
}
