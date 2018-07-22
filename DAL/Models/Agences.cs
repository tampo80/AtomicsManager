using System.Collections.Generic;

namespace DAL.Models
{
    public class Agences:AuditableEntity
    {
        public Agences()
        {
            this.ApplicationUser=new HashSet<ApplicationUser>();
        }
        public int Id { get; set; }
        public string Name { get; set; }

        public string Adresse { get; set; }

        public string HeadName { get; set; }

        public bool IsMain { get; set; }

        //navigation pro
        public int VillesId { get; set; }
        public Villes Villes { get; set; }
        public ICollection<ApplicationUser> ApplicationUser { get; set; }


    }
}