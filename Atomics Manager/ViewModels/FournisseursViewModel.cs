using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels {
    public class FournisseursViewModel {
        public int Id { get; set; }
        public string Titre { get; set; }

        public string FormeJuridique { get; set; }

        public string NomSociete { get; set; }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string Emailcommande { get; set; }

        public string TelCommande { get; set; }

        public string AlternatePhoneNumber { get; set; }
        public string CodePostale { get; set; }
        public string Adresse { get; set; }

        //navigation

        public string VillesName { get; set; }
        public string DevisesSymbole { get; set; }

        public string[] Secteurs { get; set; }
    }
}