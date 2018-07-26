using System.Collections.Generic;

namespace DAL.Models
{
    public class Services
    {
        public Services()
        {
            this.EntrepriseUserInfos = new HashSet<EntrepriseUserInfos>();
        }
        public int Id { get; set; }
        public string  Name { get; set; }
        public string Description { get; set; } 

        public ApplicationUser Head { get; set; }  
//navigation prop
         public ICollection<EntrepriseUserInfos> EntrepriseUserInfos { get; set; }

         public Departements Departements { get; set; }
  
    }
}