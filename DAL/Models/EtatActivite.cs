using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class EtatActivite
    {
        public int EtatId { get; set; }
        public Etat Etat { get; set; }
        public int ActiviteId { get; set; }
        public Activite Activite { get; set; }
    }
}
