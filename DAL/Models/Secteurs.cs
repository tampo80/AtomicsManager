using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Secteurs: AuditableEntity
    {
        public Secteurs()
        {
            this.Fournisseurs = new HashSet<SecteursFournisseurs>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string description { get; set; }

        //navigation

        public ICollection<SecteursFournisseurs> Fournisseurs { get; set; }
    }
}
