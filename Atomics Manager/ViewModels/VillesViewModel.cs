using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels {
    public class VillesViewModel {
        public int Id { get; set; }
        public string Name { get; set; }

        //navigation
        public int PaysId { get; set; }
        public PaysViewModel Pays { get; set; }

        public string PaysName { get; set; }

        public ICollection<BankInfosViewModel> BankInfos { get; set; }
        public ICollection<FournisseursViewModel> Fournisseurs { get; set; }
    }
}