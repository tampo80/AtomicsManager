using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class BonLivraisonViewModel
    {
        public int Id { get; set; }
        public string RefBL { get; set; }
        public string DemandesName { get; set; }
        public int DemandesId { get; set; }
        public string Livreure { get; set; }
        public DateTime DateLivraison { get; set; }
        public bool IsInSla { get; set; }
        public bool Control { get; set; }
        public string ControleurId { get; set; }
        public string ControleurUserName { get; set; }
        public bool MatchToBon { get; set; }
        public string Commentaire { get; set; }
        public int NoteFournisseur { get; set; }

    }
}
