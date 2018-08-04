using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Demandes:AuditableEntity
    {
        public int Id { get; set; }
        public string userId { get; set; }
        public ApplicationUser user { get; set; }
        
        public DateTime DateDemande { get; set; }
        public string Motif { get; set; }
        public decimal Montant { get; set; }
        public TypeLignesBudgetaires TypeLigne { get; set; }
        public Naturedemande Nature { get; set; }
        public DateTime DateLivraisonPrevu { get; set; }
        public DateTime DateLivraison { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int Quantite { get; set; }

        public ApprobationSatut Statut { get; set; }


        public ICollection<ApprobationWorkflow> ApprobationWorkflow { get; set; }

    }
}
