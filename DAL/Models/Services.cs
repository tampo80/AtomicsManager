using System.Collections.Generic;

namespace DAL.Models
{
    public class Services
    {
        public Services()
        {
            this.ApplicationUser=new HashSet<ApplicationUser>();
        }
        public int Id { get; set; }
        public string  Name { get; set; }
        public string Descritption { get; set; } 

        public ApplicationUser Head { get; set; }  
//navigation prop
         public ICollection<ApplicationUser> ApplicationUser { get; set; }

         public Departements Departements { get; set; }
  
    }
}