using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels {
    public class AgencesViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Adresse { get; set; }

        public string HeadName { get; set; }

        public bool IsMain { get; set; }

        public string Tel { get; set; }
        //navigation pro
        public int VillesId { get; set; }
        public int paysId { get; set; }
        public string VillesName { get; set; }
    }
}
