using System.Collections.Generic;

namespace DAL.Models
{
    public class Departements:AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string   Description { get; set; }


        //navigation
        public string HeadId { get; set; }
        public ApplicationUser Head { get; set; }

        public ICollection<Services> Services { get; set; }

        public ICollection<EntrepriseUserInfos> EntrepriseUserInfos { get; set; }

        public ICollection<BudjetDepartement> BudjetDepartement { get; set; }


    }
}