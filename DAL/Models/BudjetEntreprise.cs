using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class BudjetEntreprise:LigneBudjetaire
    {
        public Entreprise Entreprise { get; set; }
        public int EntrepriseId { get; set; }

    }
}
