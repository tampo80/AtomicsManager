using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class ComptesInternesViewModel
    {
        public int Id { get; set; }
        public string NumCompte { get; set; }
        public string Label { get; set; }
        public int TypeComptesId { get; set; }
        public string TypeComptesName { get; set; }
        public string Description { get; set; }

    }
}
