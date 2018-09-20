using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class BonLivraison:AuditableEntity
    {
        public int Id { get; set; }
        public string RefBL { get; set; }
        public Demandes Demandes { get; set; }
        public int DemandesId { get; set; }
        public string Livreure { get; set; }
        public DateTime DateLivraison { get; set; }
        public bool IsInSla { get; set; }
        public bool Control { get; set; }
        public string ControleurId { get; set; }
        public ApplicationUser Controleur { get; set; }
        public bool MatchToBon { get; set; }
        public string Commentaire { get; set; }
        public int NoteFournisseur { get; set; }

    }
}
