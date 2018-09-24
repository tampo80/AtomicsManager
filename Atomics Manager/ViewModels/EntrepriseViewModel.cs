using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels{
    public class EntrepriseViewModel
    {
        public int Id { get; set; }
        public string titre { get; set; }
        public string Name { get; set; }
        public string email { get; set; }
        public string webSite { get; set; }

        public string Tel { get; set; }

        public string Adresse { get; set; }

        public byte[] Logo { get; set; }

        public string FormeJuridique { get; set; }

        public string BudjetCapex { get; set; }
        public string BudjetOpex { get; set; }
    }
}
