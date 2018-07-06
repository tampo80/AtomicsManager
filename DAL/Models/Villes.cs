using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class Villes:AuditableEntity
    {
        public Villes()
        {
            this.BankInfos = new HashSet<BankInfos>();
            this.Fournisseurs = new HashSet<Fournisseurs>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        //navigation
        public int PaysId { get; set; }
        public Pays Pays { get; set; }

        
        public ICollection<BankInfos> BankInfos { get; set; }
        public ICollection<Fournisseurs> Fournisseurs { get; set; }
    }
}
