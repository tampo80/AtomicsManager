using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Fournisseurs:AuditableEntity
    {
        public Fournisseurs()
        {
            this.Secteurs = new HashSet<SecteursFournisseurs>();
        }
        public int Id { get; set; }
        public int Titre { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string AlternatePhoneNumber { get; set; }
        public string CodePostale { get; set; }
        public string Adresse { get; set; }

        public Devises DevisesPayement { get; set; }

        public TypePayments TypePayments { get; set; }

        public string NumeroDeCompte { get; set; }

        public string IntituleDuCompte { get; set; }

        public BankInfos BankInfos { get; set; }


        //navigation

        public int VilleId { get; set; }
        public Villes Villes { get; set; }

        public ICollection<SecteursFournisseurs> Secteurs { get; set; }
    }
}
