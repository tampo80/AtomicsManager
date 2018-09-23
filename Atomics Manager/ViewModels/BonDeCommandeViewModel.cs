using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class BonDeCommandeViewModel
{
        public int Id { get; set; }
        public DateTime DateOperation { get; set; }
        public string RefBon { get; set; }
        public int DemandesId { get; set; }
        public string DemandesName { get; set; }
        public string Montant { get; set; }
        public int Penalite { get; set; }
        public string Accompte { get; set; }
    }
}
