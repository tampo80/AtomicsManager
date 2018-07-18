using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels {
    public class PaysViewModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CodePays { get; set; }

        // navigation 
        public ICollection<VillesViewModel> Villes { get; set; }
    }
}