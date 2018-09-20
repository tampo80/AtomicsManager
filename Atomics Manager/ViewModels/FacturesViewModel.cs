using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class FacturesViewModel
    {
        public int Id { get; set; }
        public int ComptesInternesId { get; set; }
        public string  ComptesInternesName { get; set; }
        public string DemandesName { get; set; }
        public int DemandesId { get; set; }
        public DateTime DateOperation { get; set; }
        public string Ref { get; set; }
        public string Libele { get; set; }
        public bool TvaDeductible { get; set; }
        public string FraitsTransports { get; set; }
        public string Ristoune { get; set; }
        public int TauxTva { get; set; }
        public string tva { get; set; }
        public string Montant { get; set; }
        public EtatFacture EtatFacture { get; set; }

    }
}
