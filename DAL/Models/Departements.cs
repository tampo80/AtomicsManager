using System.Collections.Generic;

namespace DAL.Models
{
    public class Departements:AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string   Description { get; set; }      

        //navigation
         public ICollection<Services> Services { get; set; }

         public EntrepriseUserInfos Head { get; set; }
         public string HeadId { get; set; }

    }
}