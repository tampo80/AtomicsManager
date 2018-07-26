using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class APGmembers:AuditableEntity
    {
        public int Id { get; set; }
        public string MemberId { get; set; }
        public ApplicationUser Member { get; set; }

        public int ApprobationLevelId { get; set; }
        public ApprobationLevel ApprobationLevel { get; set; }
    }
}
