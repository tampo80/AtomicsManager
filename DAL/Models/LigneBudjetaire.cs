using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public  class LigneBudjetaire:AuditableEntity
    {
        public int Id { get; set; }
        public DateTime Annees { get; set; }
        public double LigneCapex { get; set; }
        public double LigneOpex { get; set; }
        public double BudjetOpex { get; set; }
        public double BudjetCapex { get; set; }
    }
}
