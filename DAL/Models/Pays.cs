using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{

   public class Pays :AuditableEntity
    {
        public Pays()
        {
            this.Villes =new HashSet<Villes>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string CodePays { get; set; }

        // navigation 
        public ICollection<Villes> Villes { get; set; }
    }
}
