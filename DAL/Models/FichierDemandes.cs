using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class FichierDemandes
    {
        public int Id { get; set; }
        public int DemandesId { get; set; }
        public Demandes Demandes { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime DateEnvoi { get; set; }
        public string NomFichier { get; set; }
        public byte[] Fichier { get; set; }
    }
}
