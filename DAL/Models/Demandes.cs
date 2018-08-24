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

      

      

        // new implamatations
        public int ProcessId { get; set; }
        public Process Process { get; set; }

        public int CurrentStatId { get; set; }
        public Etat CurrentStat { get; set; }

        public ICollection<Stakeholders> Stakeholders { get; set; }

        public ICollection<FichierDemandes> FichierDemandes { get; set; }

        public ICollection<InfosDemandes> InfosDemandes { get; set; }
        public ICollection<ActionsHistories> ActionsHistories { get; set; }
        public ICollection<DemandesAction> DemandesAction { get; set; }


    }
}
