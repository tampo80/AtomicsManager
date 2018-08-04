using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class ApprobationLevel:AuditableEntity
    {
        public ApprobationLevel()
        {
            this.APGmembers = new HashSet<APGmembers>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public decimal ExpensLimite { get; set; }
        public TypeApprovalGroup TypeApprovalGroup { get; set; }
       
        public bool Shared { get; set; }
        //navigation

        public ICollection<APGmembers> APGmembers { get; set; }
        public ICollection<ApprobationWorkflow> ApprobationWorkflow { get; set; }
    }
}
