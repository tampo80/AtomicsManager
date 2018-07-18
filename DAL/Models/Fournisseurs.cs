using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Fournisseurs:AuditableEntity
    {
        public Fournisseurs()
        {
            this.SecteursFournisseurs = new HashSet<SecteursFournisseurs>();
            this.DocumentsFournisseurs = new HashSet<DocumentsFournisseurs>();
        }

        public int Id { get; set; }
        public string Titre { get; set; }

        public string FormeJuridique { get; set; }

        public string NomSociete { get; set; }
       

        public string PhoneNumber { get; set; }

        public string NumTVAintracommunautare { get; set; }
        public string Email { get; set; }
       

        public string  Emailcommande { get; set; }

        public string TelCommande { get; set; }

        public string AlternatePhoneNumber { get; set; }
        public string CodePostale { get; set; }
        public string Adresse { get; set; }

        public string NomDg { get; set; }
        public string TelDg { get; set; }

        public TypePayments TypePayments { get; set; }





        //navigation

        public Devises Devises { get; set; }
        public Villes Villes { get; set; }

        public BankInfos BankInfos { get; set; }

        public ICollection<DocumentsFournisseurs> DocumentsFournisseurs { get; set; }

        public ICollection<SecteursFournisseurs> SecteursFournisseurs { get; set; }
    }
}
