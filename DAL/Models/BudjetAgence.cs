using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class BudjetAgence:LigneBudjetaire
    {
        public Agences Agences { get; set; }
        public int AgencesId { get; set; }
    }
}
