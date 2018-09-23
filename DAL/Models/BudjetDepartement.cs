using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class BudjetDepartement:LigneBudjetaire
    {
        public Departements Departements { get; set; }
        public int DepartementsId  { get; set; }
    }
}
