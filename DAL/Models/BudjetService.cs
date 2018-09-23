using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class BudjetService:LigneBudjetaire
    {
        public Services Services { get; set; }
        public int ServicesId { get; set; }
    }
}
